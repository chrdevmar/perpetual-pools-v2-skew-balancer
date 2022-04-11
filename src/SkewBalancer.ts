import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import {
  PoolWatcher,
  ExpectedPoolState,
  attemptPromiseRecursively
} from '@tracer-protocol/perpetual-pools-v2-pool-watcher';

import {
  PoolCommitter__factory,
  ERC20__factory
} from '@tracer-protocol/perpetual-pools-contracts/types';

import {
  ethersBNtoBN,
  COMMIT_TYPES,
  CommitTypeValues,
  encodeCommitArgs,
  MAX_SOL_UINT
} from './utils';

type SkewBalancerConstructorArgs = {
  nodeUrl: string
  privateKey: string
  poolAddress: string
  chainId: string
  // poolSwapLibraryAddress: string,
  gasLimit: number,
  commitmentWindowBuffer: number
  skewDeviationThreshold: number
}

type Balances = {
  settlementTokenBalance: BigNumber,
  longTokenBalance: BigNumber,
  shortTokenBalance: BigNumber,
  settlementTokenAggregateBalance: BigNumber,
  longTokenAggregateBalance: BigNumber,
  shortTokenAggregateBalance: BigNumber
}

type CommitArgs = {
  commitType: CommitTypeValues,
  amount: string,
  fromAggregateBalance: boolean,
  payForClaim: boolean
}

const stringifyBNProperties = (obj: any) => {
  const newObj: any = {};

  for (const key in obj) {
    if (obj[key] instanceof BigNumber) {
      newObj[key] = obj[key].toFixed();
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

export class SkewBalancer {
  provider: ethers.providers.BaseProvider
  wallet: ethers.Wallet
  poolWatcher: PoolWatcher
  poolAddress: string
  balances: Balances
  gasLimit: number
  skewDeviationThreshold: number
  initialised: boolean

  constructor (args: SkewBalancerConstructorArgs) {
    this.provider = ethers.getDefaultProvider(args.nodeUrl);
    this.wallet = new ethers.Wallet(args.privateKey, this.provider);
    this.poolWatcher = new PoolWatcher({
      nodeUrl: args.nodeUrl,
      poolAddress: args.poolAddress,
      chainId: args.chainId,
      commitmentWindowBuffer: args.commitmentWindowBuffer
    });
    this.balances = {
      settlementTokenBalance: new BigNumber(0),
      longTokenBalance: new BigNumber(0),
      shortTokenBalance: new BigNumber(0),
      settlementTokenAggregateBalance: new BigNumber(0),
      longTokenAggregateBalance: new BigNumber(0),
      shortTokenAggregateBalance: new BigNumber(0)
    };
    this.gasLimit = args.gasLimit;
    this.skewDeviationThreshold = args.skewDeviationThreshold;
    this.poolAddress = args.poolAddress;
    this.initialised = false;
  }

  // initialise the poolWatcher and balances
  async initialise () {
    await this.poolWatcher.initializeWatchedPool();
    // ensure that pool has approval to spend settlement token
    const settlementTokenAddress = await this.poolWatcher.poolInstance.settlementToken();
    const settlementToken = ERC20__factory.connect(settlementTokenAddress, this.wallet);
    const allowance = await settlementToken.allowance(this.wallet.address, this.poolAddress);

    if (allowance.eq(0)) {
      console.log(`approving settlement token spend for pool ${this.poolAddress}`);
      await settlementToken.approve(this.poolAddress, MAX_SOL_UINT);
    } else {
      console.log(`${this.poolAddress} is approved to spend ${allowance.toString()} settlement token`);
    }

    await this.fetchBalances();

    this.initialised = true;
  }

  async fetchBalances () {
    const [
      aggregateBalance,
      settlementTokenBalance,
      longTokenBalance,
      shortTokenBalance
    ] = await Promise.all([
      this.poolWatcher.watchedPool.committerInstance.getAggregateBalance(this.wallet.address),
      this.poolWatcher.watchedPool.settlementTokenInstance.balanceOf(this.wallet.address),
      this.poolWatcher.watchedPool.longTokenInstance.balanceOf(this.wallet.address),
      this.poolWatcher.watchedPool.shortTokenInstance.balanceOf(this.wallet.address)
    ]);

    this.balances = {
      settlementTokenAggregateBalance: ethersBNtoBN(aggregateBalance.settlementTokens),
      longTokenAggregateBalance: ethersBNtoBN(aggregateBalance.longTokens),
      shortTokenAggregateBalance: ethersBNtoBN(aggregateBalance.shortTokens),
      settlementTokenBalance: ethersBNtoBN(settlementTokenBalance),
      longTokenBalance: ethersBNtoBN(longTokenBalance),
      shortTokenBalance: ethersBNtoBN(shortTokenBalance)
    };
  }

  getBestCommitArgs (expectedState: ExpectedPoolState, balances: Balances): CommitArgs | undefined {
    // this implementation priorities keeping the skew close to 1
    // this means that it may enter less profitable positions

    const {
      expectedLongBalance,
      expectedShortBalance,
      expectedLongTokenPrice,
      expectedShortTokenPrice,
      expectedSkew
    } = expectedState;

    if (expectedSkew.gt(1)) {
      // there is excess collateral on the long side
      const collateralDiff = expectedLongBalance.minus(expectedShortBalance);

      const burnAmount = collateralDiff.div(expectedLongTokenPrice);
      // try to burn
      if (balances.longTokenAggregateBalance.gte(burnAmount)) {
        return {
          commitType: COMMIT_TYPES.LongBurn,
          amount: burnAmount.toFixed(0),
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.settlementTokenAggregateBalance.gte(collateralDiff)) {
      // resort to minting
        return {
          commitType: COMMIT_TYPES.ShortMint,
          amount: collateralDiff.toFixed(0),
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.settlementTokenBalance.gte(collateralDiff)) {
      // resort to minting
        return {
          commitType: COMMIT_TYPES.ShortMint,
          amount: collateralDiff.toFixed(0),
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
          commitType: COMMIT_TYPES.ShortBurn,
          amount: burnAmount.toFixed(0),
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.settlementTokenAggregateBalance.gte(collateralDiff)) {
        // resort to minting
        return {
          commitType: COMMIT_TYPES.LongMint,
          amount: collateralDiff.toFixed(0),
          fromAggregateBalance: true,
          payForClaim: false
        };
      } else if (balances.settlementTokenBalance.gte(collateralDiff)) {
        // resort to minting
        return {
          commitType: COMMIT_TYPES.LongMint,
          amount: collateralDiff.toFixed(0),
          fromAggregateBalance: false,
          payForClaim: false
        };
      }
    }
  }

  startSkewBalancing () {
    // start listening for events
    this.poolWatcher.startWatchingPool();

    const connectedCommitter = PoolCommitter__factory.connect(
      this.poolWatcher.watchedPool.committerInstance.address,
      this.wallet
    );

    this.poolWatcher.on('COMMITMENT_WINDOW_ENDING', async poolState => {
      console.log('EXPECTED STATE BEFORE COMMIT IS ', JSON.stringify(stringifyBNProperties(poolState), null, 2));

      if (new BigNumber(1).minus(poolState.expectedSkew).abs().lt(this.skewDeviationThreshold)) {
        console.log('abandoning skew farm commit, expected skew is already close enough to 1');
        return;
      }

      const commitArgs = this.getBestCommitArgs(poolState, this.balances);

      if (!commitArgs) {
        console.log('abandoning skew farm commit, unable to determine commit args');
        return;
      }

      const stillInSameInterval = await this.poolWatcher.isCommitmentWindowStillOpen(
        poolState.updateIntervalId.toNumber()
      );

      if (!stillInSameInterval) {
        console.log('abandoning skew farm commit, commitment window missed');
        return;
      }

      console.log('COMMITING WITH ARGS', JSON.stringify(stringifyBNProperties(commitArgs), null, 2));

      await attemptPromiseRecursively({
        promise: () => connectedCommitter.commit(encodeCommitArgs(commitArgs)
        ),
        retryCheck: (error: any) => {
          console.log(`RETRYING AFTER FAILURE: ${error.message}`);
          return this.poolWatcher.isCommitmentWindowStillOpen(
            poolState.updateIntervalId.toNumber()
          );
        }
      });

      const expectedStateInputs = await this.poolWatcher.getExpectedStateInputs();
      const expectedState = this.poolWatcher.calculatePoolState(expectedStateInputs);

      console.log('EXPECTED STATE AFTER COMMIT IS ', JSON.stringify(stringifyBNProperties(expectedState), null, 2));

      await this.fetchBalances();
    });
  }
}
