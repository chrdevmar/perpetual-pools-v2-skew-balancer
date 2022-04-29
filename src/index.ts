import dotenv from 'dotenv';
import { SkewBalancer } from './SkewBalancer';

dotenv.config();

async function main () {
  const poolAddresses = (process.env.POOL_ADDRESSES || '').split(',');

  for (const poolAddress of poolAddresses) {
    const skewBalancer = new SkewBalancer({
      privateKey: process.env.PRIVATE_KEY as string,
      poolAddress,
      chainId: '421611',
      nodeUrl: process.env.NODE_URL as string,
      gasLimit: Number(process.env.GAS_LIMIT || 5000000),
      commitmentWindowBuffer: 30, // perform commits 30 seconds before the end of the commitment window
      skewDeviationThreshold: 0.05
    });

    await skewBalancer.initialise();

    skewBalancer.startSkewBalancing();
  }
}

main();
