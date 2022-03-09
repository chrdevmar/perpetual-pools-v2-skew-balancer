/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IHistoricalOracleWrapper,
  IHistoricalOracleWrapperInterface,
} from "../IHistoricalOracleWrapper";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "wad",
        type: "int256",
      },
    ],
    name: "fromWad",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPriceAndMetadata",
    outputs: [
      {
        internalType: "int256",
        name: "_price",
        type: "int256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    name: "setOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IHistoricalOracleWrapper__factory {
  static readonly abi = _abi;
  static createInterface(): IHistoricalOracleWrapperInterface {
    return new utils.Interface(_abi) as IHistoricalOracleWrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IHistoricalOracleWrapper {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IHistoricalOracleWrapper;
  }
}
