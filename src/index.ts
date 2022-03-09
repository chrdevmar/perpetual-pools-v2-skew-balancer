import dotenv from 'dotenv';
import SkewFarmer from './skewFarmer';

dotenv.config();

async function main () {
  const keeper = new SkewFarmer({
    graphUrl: process.env.SUBGRAPH_URL as string,
    privateKey: process.env.PRIVATE_KEY as string,
    nodeUrl: process.env.NODE_URL as string,
    skipPools: {
      '0x7f3b68724ceed8533102c80f45e3a851e24cb14c': true,
      '0x9f280f08c0aae460022e59930c4453c36802b3c6': true,
      '0xd9991942bc6d916a8c591f888e8e81fab4cc254d': false,
      '0xea098d1ba10d4818450b4ec329098673bcae31b3': true,
      '0xf8abfe7803a7ae2d088e0d6369235842a2312751': true
    },
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    upkeepBuffer: 30, // perform commits 30 seconds before the end of the commitment window
    skewDeviationThreshold: 0.1
  });

  await keeper.syncWatchedPools();

  keeper.startSyncingNewPools({ interval: Number(process.env.POOL_SYNC_INTERVAL || 30000) });
  keeper.startSkewBalancing({ interval: Number(process.env.UPKEEP_INTERVAL || 5000) });
}

main();
