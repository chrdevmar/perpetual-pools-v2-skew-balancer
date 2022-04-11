import dotenv from 'dotenv';
import { SkewBalancer } from './SkewBalancer';

dotenv.config();

async function main () {
  const eth3 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0xC2CA40ED6E079dAcfDdC6F2E227ae657D5b81e9A',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const link3 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0xb3a4b189a489780EaC5b076DDef6ab088c9951e0',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const btc3 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x945DB8dF0597273D6d4d2B1e5442019f52e069fE',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const eth5 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x0945639d1123b2d7783363967d9AB58Ceeb2bE89',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const link5 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0xb2AD33cE1FEcF7ebA71425198afBeB86D5225e42',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const btc5 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x783aa1F06B0f16674DCC226e51Cf93ec3a4e8e85',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const eth7 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x8155a758a06E7e385191C119D35195Aa743cBe9f',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const link7 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x80160C3Dd85890C4E5B8C90746a9FD8608465325',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  const btc7 = new SkewBalancer({
    privateKey: process.env.PRIVATE_KEY as string,
    poolAddress: '0x925070199FD201FFB473b023407c923B61071673',
    chainId: '421611',
    nodeUrl: process.env.NODE_URL as string,
    gasLimit: Number(process.env.GAS_LIMIT || 5000000),
    commitmentWindowBuffer: 15, // perform commits 15 seconds before the end of the commitment window
    skewDeviationThreshold: 0.01
  });

  await eth3.initialise();
  await link3.initialise();
  await btc3.initialise();

  await eth5.initialise();
  await link5.initialise();
  await btc5.initialise();

  await eth7.initialise();
  await link7.initialise();
  await btc7.initialise();

  eth3.startSkewBalancing();
  link3.startSkewBalancing();
  btc3.startSkewBalancing();

  eth5.startSkewBalancing();
  link5.startSkewBalancing();
  btc5.startSkewBalancing();

  eth7.startSkewBalancing();
  link7.startSkewBalancing();
  btc7.startSkewBalancing();
}

main();
