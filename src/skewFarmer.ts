import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { calcNextValueTransfer } from '@tracer-protocol/pools-js';
import { makeGraphRequest } from './thegraph';
import {
  ERC20,
  ERC20__factory,
  LeveragedPool,
  LeveragedPool__factory,
  PoolCommitter,
  PoolCommitter__factory,
  PoolKeeper,
  PoolKeeper__factory
} from './typesV2';
import { attemptPromiseRecursively, ethersBNtoBN, MAX_SOL_UINT } from './utils';

type SkewFarmerConstructorArgs = {
  graphUrl: string,
  nodeUrl: string,
  privateKey: string,
  skipPools: { [poolAddress: string]: boolean },
  // poolSwapLibraryAddress: string,
  gasLimit: number,
  upkeepBuffer: number
  skewDeviationThreshold: number
}

type Balances = {
  quoteTokenBalance: BigNumber,
  longTokenBalance: BigNumber,
  shortTokenBalance: BigNumber,
  quoteTokenAggregateBalance: BigNumber,
  longTokenAggregateBalance: BigNumber,
  shortTokenAggregateBalance: BigNumber,
}

type WatchedPool = {
  address: string,
  committerAddress: string,
  name: string,
  keeperAddress: string,
  updateInterval: number,
  lastPriceTimestamp: number,
  leverage: number,
  poolInstance: LeveragedPool,
  longTokenInstance: ERC20,
  shortTokenInstance: ERC20,
  quoteTokenInstance: ERC20,
  committerInstance: PoolCommitter,
  frontRunningInterval: number,
  isBusy: boolean,
  balances: Balances
}

type CalculatedPoolState = {
  currentSkew: number,
  currentLongBalance: BigNumber,
  currentLongSupply: BigNumber,
  currentShortBalance: BigNumber,
  currentShortSupply: BigNumber,
  expectedSkew: number,
  expectedLongBalance: BigNumber,
  expectedLongSupply: BigNumber,
  expectedShortBalance: BigNumber,
  expectedShortSupply: BigNumber,
  totalNetPendingLong: BigNumber,
  totalNetPendingShort: BigNumber,
  expectedLongTokenPrice: BigNumber,
  expectedShortTokenPrice: BigNumber,
}

type CommitType = 'LongMint' | 'LongBurn' | 'ShortMint' | 'ShortBurn' | 'LongBurnShortMint' | 'ShortBurnLongMint';

type CommitArgs = {
  commitType: CommitType,
  amount: BigNumber,
  fromAggregateBalance: boolean,
  payForClaim: boolean
}

type GraphLeveragedPool = {
  committer: string,
  keeper: string,
  name: string,
  id: string,
  updateInterval: string,
  frontRunningInterval: string,
  leverage: string,
  longToken: string,
  shortToken: string,
  quoteToken: string
}

type TotalPoolCommitments = [
  ethers.BigNumber,
  ethers.BigNumber,
  ethers.BigNumber,
  ethers.BigNumber,
  ethers.BigNumber,
  ethers.BigNumber,
  ethers.BigNumber
] & {
  longMintAmount: ethers.BigNumber;
  longBurnAmount: ethers.BigNumber;
  shortMintAmount: ethers.BigNumber;
  shortBurnAmount: ethers.BigNumber;
  shortBurnLongMintAmount: ethers.BigNumber;
  longBurnShortMintAmount: ethers.BigNumber;
  updateIntervalId: ethers.BigNumber;
}

type TotalPoolCommitmentsBN = {
  longMintAmount: BigNumber;
  longBurnAmount: BigNumber;
  shortMintAmount: BigNumber;
  shortBurnAmount: BigNumber;
  shortBurnLongMintAmount: BigNumber;
  longBurnShortMintAmount: BigNumber;
  updateIntervalId: BigNumber;
}

class Keeper {
  provider: ethers.providers.BaseProvider
  wallet: ethers.Wallet
  graphUrl: string
  watchedPools: Record<string, WatchedPool>
  keeperInstances: Record<string, PoolKeeper>
  scheduledUpkeeps: Record<string, Record<string, { pools: string[], upkeepPromise: Promise<void> }>>
  skipPools: Record<string, boolean>
  onChainTimestamp: number
  gasLimit: number
  upkeepBuffer: number
  skewDeviationThreshold: number

  constructor (args: SkewFarmerConstructorArgs) {
    this.provider = ethers.getDefaultProvider(args.nodeUrl);
    this.wallet = new ethers.Wallet(args.privateKey, this.provider);
    this.graphUrl = args.graphUrl;
    this.onChainTimestamp = 0;
    this.watchedPools = {};
    this.keeperInstances = {};
    this.scheduledUpkeeps = {};
    this.skipPools = args.skipPools;
    this.gasLimit = args.gasLimit;
    this.upkeepBuffer = args.upkeepBuffer;
    this.skewDeviationThreshold = args.skewDeviationThreshold;
  }

  // fetch known pools from the graph and add any new ones as a watched pool
  async syncWatchedPools () {
    const graphResponse = await makeGraphRequest<{ data: { leveragedPools: GraphLeveragedPool[] } }>({
      url: this.graphUrl,
      query: `
        {
          leveragedPools {
            id
            name
            committer
            keeper
            updateInterval
            frontRunningInterval
            leverage
            longToken
            shortToken
            quoteToken
          }
        }
      `
    });

    const promises = graphResponse.data.leveragedPools.map((graphPool) => {
      const { id } = graphPool;
      if (!this.watchedPools[id] && !this.skipPools[id]) {
        console.log(`Adding ${id} as a watched pool`);
        return attemptPromiseRecursively({
          promise: async () => this.initializeWatchedPool(graphPool)
        });
      }
      return Promise.resolve();
    });

    await Promise.all(promises);
  }

  async initializeWatchedPool (poolDetails: GraphLeveragedPool) {
    const {
      id,
      name,
      committer,
      keeper,
      updateInterval,
      leverage,
      frontRunningInterval,
      quoteToken,
      shortToken,
      longToken
    } = poolDetails;

    const poolInstance = LeveragedPool__factory.connect(id, this.wallet);
    const committerInstance = PoolCommitter__factory.connect(committer, this.wallet);
    const longTokenInstance = ERC20__factory.connect(longToken, this.wallet);
    const shortTokenInstance = ERC20__factory.connect(shortToken, this.wallet);
    const quoteTokenInstance = ERC20__factory.connect(quoteToken, this.wallet);

    const [
      lastPriceTimestamp,
      aggregateBalance,
      quoteTokenAllowance,
      quoteTokenBalance,
      longTokenBalance,
      shortTokenBalance
    ] = await Promise.all([
      poolInstance.lastPriceTimestamp(),
      committerInstance.getAggregateBalance(this.wallet.address),
      quoteTokenInstance.allowance(this.wallet.address, id),
      quoteTokenInstance.balanceOf(this.wallet.address),
      longTokenInstance.balanceOf(this.wallet.address),
      shortTokenInstance.balanceOf(this.wallet.address)
    ]);

    // ensure this wallet has approved pool to spend quote tokens
    if (quoteTokenAllowance.eq(0)) {
      console.log(`APPROVING QUOTE TOKEN SPEND FROM ${name}...`);
      await quoteTokenInstance.approve(id, MAX_SOL_UINT);
    }

    const lastPriceTimestampNumber = lastPriceTimestamp.toNumber();

    const updateIntervalNumber = Number(updateInterval);

    this.watchedPools[id] = {
      address: id,
      name,
      committerAddress: committer,
      committerInstance,
      keeperAddress: keeper,
      updateInterval: updateIntervalNumber,
      longTokenInstance,
      shortTokenInstance,
      quoteTokenInstance,
      frontRunningInterval: Number(frontRunningInterval),
      lastPriceTimestamp: lastPriceTimestampNumber,
      poolInstance,
      leverage: Number(leverage),
      isBusy: false,
      balances: {
        quoteTokenAggregateBalance: ethersBNtoBN(aggregateBalance.settlementTokens),
        longTokenAggregateBalance: ethersBNtoBN(aggregateBalance.longTokens),
        shortTokenAggregateBalance: ethersBNtoBN(aggregateBalance.shortTokens),
        quoteTokenBalance: ethersBNtoBN(quoteTokenBalance),
        longTokenBalance: ethersBNtoBN(longTokenBalance),
        shortTokenBalance: ethersBNtoBN(shortTokenBalance)
      }
    };

    if (!this.keeperInstances[keeper]) {
      this.keeperInstances[keeper] = PoolKeeper__factory.connect(keeper, this.wallet);
    }
  }

  // getNextUpdateIntervalToProcess(poolAddress: string): { updateIntervalId, commitDeadlineTimestamp } {
  //
  // }

  // given a pool address
  // gets the pending commits for all intervals that are relevant to estimating skew at this point in time
  // this will return an array of pendingCommit objects with one element per upkeep that occurs within the frontrunning interval
  async getRelevantPendingCommits (poolAddress: string): Promise<TotalPoolCommitments[]> {
    const watchedPool = this.watchedPools[poolAddress];
    const poolCommitterInstance = watchedPool.committerInstance;

    if (watchedPool.frontRunningInterval < watchedPool.updateInterval) {
      // simple case, commits will be executed either in next upkeep or one after if committed within the front running interval
      const [pendingCommitsThisInterval, pendingCommitsNextInterval] = await poolCommitterInstance.getPendingCommits();

      return [
        pendingCommitsThisInterval,
        pendingCommitsNextInterval
      ];
    }

    const upkeepsPerFrontRunningInterval = Math.floor(watchedPool.frontRunningInterval / watchedPool.updateInterval);

    const pendingCommitPromises: Promise<TotalPoolCommitments>[] = [];

    // next update interval to be upkept
    const updateIntervalId = await watchedPool.poolInstance.updateInterval();

    // the last update interval that will be executed in the frontrunning interval as of now
    const maxIntervalId = updateIntervalId + upkeepsPerFrontRunningInterval - 1;

    for (let i = updateIntervalId; i < maxIntervalId; i++) {
      pendingCommitPromises.push(attemptPromiseRecursively({
        promise: () => poolCommitterInstance.totalPoolCommitments(i)
      }));
    }

    return await Promise.all(pendingCommitPromises);
  }

  pendingCommitsToBN (pendingCommits: TotalPoolCommitments): TotalPoolCommitmentsBN {
    return {
      longBurnAmount: ethersBNtoBN(pendingCommits.longBurnAmount),
      longMintAmount: ethersBNtoBN(pendingCommits.longMintAmount),
      longBurnShortMintAmount: ethersBNtoBN(pendingCommits.longBurnShortMintAmount),
      shortBurnAmount: ethersBNtoBN(pendingCommits.shortBurnAmount),
      shortMintAmount: ethersBNtoBN(pendingCommits.shortMintAmount),
      shortBurnLongMintAmount: ethersBNtoBN(pendingCommits.shortBurnLongMintAmount),
      updateIntervalId: ethersBNtoBN(pendingCommits.updateIntervalId)
    };
  }

  async getPoolState (poolAddress: string): Promise<CalculatedPoolState> {
    const { poolInstance, leverage, longTokenInstance, shortTokenInstance, keeperAddress } = this.watchedPools[poolAddress];
    const keeperInstance = this.keeperInstances[keeperAddress];

    const [
      _longBalance,
      _shortBalance,
      currentOraclePrice,
      lastOraclePrice,
      pendingCommits,
      longTokenSupply,
      shortTokenSupply
    ] = await Promise.all([
      poolInstance.longBalance(),
      poolInstance.shortBalance(),
      poolInstance.getOraclePrice(),
      keeperInstance.executionPrice(poolAddress),
      this.getRelevantPendingCommits(poolAddress),
      longTokenInstance.totalSupply(),
      shortTokenInstance.totalSupply()
    ]);

    const longBalance = ethersBNtoBN(_longBalance);
    const shortBalance = ethersBNtoBN(_shortBalance);

    let expectedLongBalance = new BigNumber(longBalance.toString());
    let expectedShortBalance = new BigNumber(shortBalance.toString());
    let expectedLongSupply = new BigNumber(longTokenSupply.toString());
    let expectedShortSupply = new BigNumber(shortTokenSupply.toString());
    let totalNetPendingLong = new BigNumber(0);
    let totalNetPendingShort = new BigNumber(0);
    let expectedLongTokenPrice = expectedLongBalance.div(expectedLongSupply);
    let expectedShortTokenPrice = expectedShortBalance.div(expectedShortSupply);

    for (const pendingCommit of pendingCommits) {
      const {
        longBurnAmount,
        longBurnShortMintAmount,
        longMintAmount,
        shortBurnAmount,
        shortBurnLongMintAmount,
        shortMintAmount
      } = this.pendingCommitsToBN(pendingCommit);

      const { longValueTransfer, shortValueTransfer } = calcNextValueTransfer(
        ethersBNtoBN(lastOraclePrice),
        ethersBNtoBN(currentOraclePrice), // TODO, emulate SMA using current oracle price
        new BigNumber(leverage),
        longBalance,
        shortBalance
      );

      // balances immediately before commits executed
      const _expectedLongBalance = expectedLongBalance.plus(longValueTransfer);
      const _expectedShortBalance = expectedShortBalance.plus(shortValueTransfer);

      const totalLongBurn = longBurnAmount.plus(longBurnShortMintAmount);
      const totalShortBurn = shortBurnAmount.plus(shortBurnLongMintAmount);

      // current balance + expected value transfer / expected supply
      // if either side has no token supply, any amount no matter how small will buy the whole side
      const longTokenPriceDenominator = expectedLongSupply.plus(totalLongBurn);

      expectedLongTokenPrice = longTokenPriceDenominator.lte(0)
        ? _expectedLongBalance
        : _expectedLongBalance.div(longTokenPriceDenominator);

      const shortTokenPriceDenominator = expectedShortSupply.plus(totalShortBurn);

      expectedShortTokenPrice = shortTokenPriceDenominator.lte(0)
        ? _expectedShortBalance
        : _expectedShortBalance.div(shortTokenPriceDenominator);

      const totalLongMint = longMintAmount.plus(shortBurnLongMintAmount.times(expectedShortTokenPrice));
      const totalShortMint = shortMintAmount.plus(longBurnShortMintAmount.times(expectedLongTokenPrice));

      const netPendingLongBalance = totalLongMint.minus(totalLongBurn.times(expectedLongTokenPrice));
      const netPendingShortBalance = totalShortMint.minus(totalShortBurn.times(expectedShortTokenPrice));

      totalNetPendingLong = totalNetPendingLong.plus(netPendingLongBalance);
      totalNetPendingShort = totalNetPendingShort.plus(netPendingShortBalance);

      expectedLongBalance = expectedLongBalance.plus(netPendingLongBalance);
      expectedShortBalance = expectedShortBalance.plus(netPendingShortBalance);

      expectedLongSupply = expectedLongSupply.minus(totalLongBurn).plus(totalLongMint.div(expectedLongTokenPrice));
      expectedShortSupply = expectedShortSupply.minus(totalShortBurn).plus(totalShortMint.div(expectedShortTokenPrice));
    }

    const expectedSkew = expectedShortBalance.eq(0) || expectedLongBalance.eq(0)
      ? 1
      : expectedLongBalance.div(expectedShortBalance).toNumber();

    return {
      currentSkew: longBalance.eq(0) || shortBalance.eq(0) ? 1 : longBalance.div(shortBalance).toNumber(),
      currentLongBalance: longBalance,
      currentLongSupply: ethersBNtoBN(longTokenSupply),
      currentShortBalance: shortBalance,
      currentShortSupply: ethersBNtoBN(shortTokenSupply),
      expectedSkew,
      expectedLongBalance,
      expectedLongSupply,
      expectedShortBalance,
      expectedShortSupply,
      totalNetPendingLong,
      totalNetPendingShort,
      expectedLongTokenPrice,
      expectedShortTokenPrice
    };
  }

  getBestCommitArgs (calculatedState: CalculatedPoolState, balances: Balances): CommitArgs | undefined {
    // this implementation priorities keeping the skew close to 1
    // this means that it may enter less profitable positions

    const {
      expectedLongBalance,
      expectedShortBalance,
      expectedLongTokenPrice,
      expectedShortTokenPrice,
      expectedSkew
    } = calculatedState;

    if (expectedSkew > 1) {
      // there is excess collateral on the long side
      const collateralDiff = expectedLongBalance.minus(expectedShortBalance);

      const burnAmount = collateralDiff.div(expectedLongTokenPrice);
      // try to burn
      if (balances.longTokenAggregateBalance.gte(burnAmount)) {
        return {
          commitType: 'LongBurn',
          amount: burnAmount,
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.quoteTokenAggregateBalance.gte(collateralDiff)) {
      // resort to minting
        return {
          commitType: 'ShortMint',
          amount: collateralDiff,
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.quoteTokenBalance.gte(collateralDiff)) {
      // resort to minting
        return {
          commitType: 'ShortMint',
          amount: collateralDiff,
          fromAggregateBalance: false,
          payForClaim: false
        };
      }
    } else {
    // excess collateral on the short side
      const collateralDiff = expectedShortBalance.minus(expectedLongBalance);

      const burnAmount = collateralDiff.div(expectedShortTokenPrice);
      // try to burn
      if (balances.shortTokenAggregateBalance.gte(burnAmount)) {
        return {
          commitType: 'ShortBurn',
          amount: burnAmount,
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.quoteTokenAggregateBalance.gte(collateralDiff)) {
        // resort to minting
        return {
          commitType: 'ShortMint',
          amount: collateralDiff,
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.quoteTokenBalance.gte(collateralDiff)) {
        // resort to minting
        return {
          commitType: 'ShortMint',
          amount: collateralDiff,
          fromAggregateBalance: false,
          payForClaim: false
        };
      }
    }
  }

  async rebalanceSkewSinglePool (poolAddress: string) {
    // calculate expected next skew
    // if expected skew is close enough to 1
    // don't bother doing anything
    // use this.skewDeviationThreshold to calculate this

    const state = await this.getPoolState(poolAddress);

    const skewDeviation = Math.abs(1 - state.expectedSkew);

    if (skewDeviation < this.skewDeviationThreshold) {
      // skew is close enough to 1, don't do anything
      // TODO: mark as dealt with for this update interval
      return;
    }

    console.log(`POOL ${this.watchedPools[poolAddress].name} has calculated state: ${JSON.stringify({
      currentSkew: state.currentSkew.toFixed(),
      currentLongBalance: state.currentLongBalance.div(10 * 18).toFixed(),
      currentShortBalance: state.currentShortBalance.div(10 * 18).toFixed(),
      currentLongSupply: state.currentLongSupply.div(10 ** 18).toFixed(),
      currentShortSupply: state.currentShortSupply.div(10 ** 18).toFixed(),
      totalNetPendingLong: state.totalNetPendingLong.div(10 ** 18).toFixed(),
      totalNetPendingShort: state.totalNetPendingShort.div(10 ** 18).toFixed(),
      expectedSkew: state.expectedSkew.toFixed(),
      expectedLongBalance: state.expectedLongBalance.div(10 * 18).toFixed(),
      expectedShortBalance: state.expectedShortBalance.div(10 * 18).toFixed(),
      expectedLongSupply: state.expectedLongSupply.div(10 ** 18).toFixed(),
      expectedShortSupply: state.expectedShortSupply.div(10 ** 18).toFixed()
    }, null, 2)}`);

    const commitArgs = this.getBestCommitArgs(state, this.watchedPools[poolAddress].balances);

    if (!commitArgs) {
      console.log('NO COMMIT ARGS GENERATED');
      return;
    }

    console.log(`COLLATERAL DIFF: ${state.expectedLongBalance.minus(state.expectedShortBalance).toFixed()}`);

    console.log(`CALCULATED COMMIT ARGS: ${JSON.stringify({
      commitType: commitArgs.commitType,
      amount: commitArgs.amount.toFixed(),
      fromAggregateBalance: commitArgs.fromAggregateBalance,
      payForClaim: commitArgs.payForClaim
    }, null, 2)}`);

    await this.watchedPools[poolAddress].committerInstance.commit(
      commitArgs.commitType,
      commitArgs.amount.toFixed(),
      commitArgs.fromAggregateBalance,
      commitArgs.payForClaim
    );
    // execute commit - only retry if we are still before the front running interval
  }

  rebalanceSkewAllPools () {
    const dueForSkewRebalance: WatchedPool[] = [];
    const dueForLastPriceTimestampRefresh: WatchedPool[] = [];

    const now = Math.floor(Date.now() / 1000);

    for (const poolAddress in this.watchedPools) {
      const { lastPriceTimestamp, frontRunningInterval, updateInterval, isBusy } = this.watchedPools[poolAddress];

      console.log(`POOL ${this.watchedPools[poolAddress].name} was last upkept at ${lastPriceTimestamp}, time is currently ${now}. (upkept ${now - lastPriceTimestamp} seconds ago)`);

      if (isBusy) {
        continue;
      }

      const commitmentWindowEnd = (frontRunningInterval < updateInterval
        // simple case
        ? lastPriceTimestamp + updateInterval - frontRunningInterval
        // complex case, multiple update intervals within frontRunningInterval
        : lastPriceTimestamp + updateInterval) - 5; // add 5 second buffer due to arbitrum block time jank

      // commitment window has passed
      // we either missed it, or we would have already committed this window
      if (commitmentWindowEnd <= now) {
        console.log(`COMMITMENT WINDOW MISSED FOR POOL ${this.watchedPools[poolAddress].name}`);
        this.watchedPools[poolAddress].isBusy = true;
        dueForLastPriceTimestampRefresh.push(this.watchedPools[poolAddress]);
        continue;
      }

      console.log(`COMMITMENT WINDOW FOR POOL ${this.watchedPools[poolAddress].name} ENDS IN ${commitmentWindowEnd - now} seconds`);
      // if we are close to the end of the commitment window
      // it is a good time to get our commits in
      if (commitmentWindowEnd > now && commitmentWindowEnd - this.upkeepBuffer <= now) {
        console.log(`NEAR END OF COMMITMENT WINDOW FOR ${this.watchedPools[poolAddress].name}, marking as due for skew farm`);
        this.watchedPools[poolAddress].isBusy = true;

        dueForSkewRebalance.push(this.watchedPools[poolAddress]);
      }
    }

    for (const watchedPool of dueForSkewRebalance) {
      attemptPromiseRecursively({
        promise: async () => {
          await this.rebalanceSkewSinglePool(watchedPool.address);
          // const expectedSkew = await this.getExpectedSkew(watchedPool.address);

          // console.log(`POOL ${watchedPool.address} has expected skew of ${expectedSkew.toString()}`);
          // calculate expected next skew
          // calculate commit required to make it close to 1
          // execute commit - only retry if we are still before the front running interval
        },
        retryCheck: async () => {
          // return true if we are still before the front running interval
          // return false if we are too close to front running interval to be safe
          return false;
        }
      })
        .finally(async () => {
          const newLastPriceTimestamp = (await watchedPool.poolInstance.lastPriceTimestamp()).toNumber();
          this.watchedPools[watchedPool.address].lastPriceTimestamp = newLastPriceTimestamp;
          // set the last price timestamp on the watched pool
          // refetch aggregate balances and pool token balances
        });
    }

    for (const watchedPool of dueForLastPriceTimestampRefresh) {
      attemptPromiseRecursively({
        promise: async () => {
          const newLastPriceTimestamp = (await watchedPool.poolInstance.lastPriceTimestamp()).toNumber();
          this.watchedPools[watchedPool.address].lastPriceTimestamp = newLastPriceTimestamp;
          this.watchedPools[watchedPool.address].isBusy = false;
        }
      });
    }
  }

  startSkewBalancing ({ interval }: { interval: number }) {
    setInterval(this.rebalanceSkewAllPools.bind(this), interval);
  }

  startSyncingNewPools ({ interval }: { interval: number }) {
    setInterval(this.syncWatchedPools.bind(this), interval);
  }
}

export default Keeper;
