import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';

export const attemptPromiseRecursively = async <T>({
  promise,
  retryCheck,
  interval = 1000
}: {
  promise: () => Promise<T>,
  retryCheck?: () => Promise<boolean>,
  interval?: number
}): Promise<T> => {
  try {
    return await promise();
  } catch (error) {
    await new Promise(resolve => setTimeout(resolve, interval));
    // todo
    if (retryCheck && await retryCheck()) {
      return attemptPromiseRecursively({ promise, retryCheck, interval });
    } else {
      return undefined as unknown as T;
    }
  }
};

export const ethersBNtoBN = (ethersBN: ethers.BigNumber): BigNumber => {
  return new BigNumber(ethersBN.toString());
};

export const MAX_SOL_UINT = ethers.BigNumber.from('340282366920938463463374607431768211455');
