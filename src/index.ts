import dotenv from 'dotenv';
import { SkewBalancer } from './SkewBalancer';

dotenv.config();

async function main () {
  const eth3 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x5c117522c6be2846f92943e54670474f3cb5ad9e',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 30, // perform commits 30 seconds before the end of the commitment window
    skewDeviationThreshold: 0.05
  });

  const btc3 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x909f7e70068d0dc55d9c615b3c5ea84929e7687a',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 30, // perform commits 30 seconds before the end of the commitment window
    skewDeviationThreshold: 0.05
  });

  const eth4 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x2865802681f6f25d43bac9fe60e6295a595d21c0',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 30, // perform commits 30 seconds before the end of the commitment window
    skewDeviationThreshold: 0.05
  });

  const btc4 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x9b106bf5e584b65156097c3542b0501f1f22854d',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 30, // perform commits 30 seconds before the end of the commitment window
    skewDeviationThreshold: 0.05
  });

  await eth3.initialise();
  await btc3.initialise();
  await eth4.initialise();
  await btc4.initialise();

  eth3.startSkewBalancing();
  btc3.startSkewBalancing();
  eth4.startSkewBalancing();
  btc4.startSkewBalancing();
}

main();
