/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ILeveragedPoolInterface extends ethers.utils.Interface {
  functions: {
    "balances()": FunctionFragment;
    "burnTokens(bool,uint256,address)": FunctionFragment;
    "claimGovernance()": FunctionFragment;
    "frontRunningInterval()": FunctionFragment;
    "getOraclePrice()": FunctionFragment;
    "getUpkeepInformation()": FunctionFragment;
    "initialize(tuple)": FunctionFragment;
    "intervalPassed()": FunctionFragment;
    "lastPriceTimestamp()": FunctionFragment;
    "leverageAmount()": FunctionFragment;
    "longBalance()": FunctionFragment;
    "mintTokens(bool,uint256,address)": FunctionFragment;
    "oracleWrapper()": FunctionFragment;
    "payKeeperFromBalances(address,uint256)": FunctionFragment;
    "poolCommitter()": FunctionFragment;
    "poolName()": FunctionFragment;
    "poolTokenTransfer(bool,address,uint256)": FunctionFragment;
    "poolTokens()": FunctionFragment;
    "poolUpkeep(int256,int256)": FunctionFragment;
    "quoteToken()": FunctionFragment;
    "quoteTokenTransfer(address,uint256)": FunctionFragment;
    "quoteTokenTransferFrom(address,address,uint256)": FunctionFragment;
    "setKeeper(address)": FunctionFragment;
    "setNewPoolBalances(uint256,uint256)": FunctionFragment;
    "settlementEthOracle()": FunctionFragment;
    "shortBalance()": FunctionFragment;
    "transferGovernance(address)": FunctionFragment;
    "updateFeeAddress(address)": FunctionFragment;
    "updateInterval()": FunctionFragment;
    "updateSecondaryFeeAddress(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "balances", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "burnTokens",
    values: [boolean, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "claimGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "frontRunningInterval",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOraclePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUpkeepInformation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      {
        _owner: string;
        _keeper: string;
        _oracleWrapper: string;
        _settlementEthOracle: string;
        _longToken: string;
        _shortToken: string;
        _poolCommitter: string;
        _invariantCheckContract: string;
        _poolName: string;
        _frontRunningInterval: BigNumberish;
        _updateInterval: BigNumberish;
        _leverageAmount: BigNumberish;
        _fee: BigNumberish;
        _feeAddress: string;
        _secondaryFeeAddress: string;
        _quoteToken: string;
        _secondaryFeeSplitPercent: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "intervalPassed",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastPriceTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "leverageAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "longBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintTokens",
    values: [boolean, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "oracleWrapper",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "payKeeperFromBalances",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "poolCommitter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "poolName", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "poolTokenTransfer",
    values: [boolean, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "poolTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "poolUpkeep",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "quoteTokenTransfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteTokenTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setKeeper", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setNewPoolBalances",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "settlementEthOracle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "shortBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateFeeAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateInterval",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateSecondaryFeeAddress",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burnTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "frontRunningInterval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOraclePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUpkeepInformation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "intervalPassed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastPriceTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "leverageAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "longBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "oracleWrapper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payKeeperFromBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "poolCommitter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "poolTokenTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "poolTokens", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolUpkeep", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "quoteToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "quoteTokenTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteTokenTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setKeeper", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setNewPoolBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settlementEthOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "shortBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateFeeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateInterval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSecondaryFeeAddress",
    data: BytesLike
  ): Result;

  events: {
    "FeeAddressUpdated(address,address)": EventFragment;
    "GovernanceAddressChanged(address,address)": EventFragment;
    "KeeperAddressChanged(address,address)": EventFragment;
    "PoolInitialized(address,address,address,string)": EventFragment;
    "PoolRebalance(int256,int256,uint256,uint256)": EventFragment;
    "PriceChangeError(int256,int256)": EventFragment;
    "ProvisionalGovernanceChanged(address)": EventFragment;
    "SecondaryFeeAddressUpdated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeeAddressUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GovernanceAddressChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "KeeperAddressChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolInitialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolRebalance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PriceChangeError"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "ProvisionalGovernanceChanged"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SecondaryFeeAddressUpdated"): EventFragment;
}

export class ILeveragedPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ILeveragedPoolInterface;

  functions: {
    balances(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        _shortBalance: BigNumber;
        _longBalance: BigNumber;
      }
    >;

    burnTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    frontRunningInterval(overrides?: CallOverrides): Promise<[number]>;

    getOraclePrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getUpkeepInformation(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber] & {
        _latestPrice: BigNumber;
        _data: string;
        _lastPriceTimestamp: BigNumber;
        _updateInterval: BigNumber;
      }
    >;

    initialize(
      initialization: {
        _owner: string;
        _keeper: string;
        _oracleWrapper: string;
        _settlementEthOracle: string;
        _longToken: string;
        _shortToken: string;
        _poolCommitter: string;
        _invariantCheckContract: string;
        _poolName: string;
        _frontRunningInterval: BigNumberish;
        _updateInterval: BigNumberish;
        _leverageAmount: BigNumberish;
        _fee: BigNumberish;
        _feeAddress: string;
        _secondaryFeeAddress: string;
        _quoteToken: string;
        _secondaryFeeSplitPercent: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    intervalPassed(overrides?: CallOverrides): Promise<[boolean]>;

    lastPriceTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    leverageAmount(overrides?: CallOverrides): Promise<[string]>;

    longBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    oracleWrapper(overrides?: CallOverrides): Promise<[string]>;

    payKeeperFromBalances(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    poolCommitter(overrides?: CallOverrides): Promise<[string]>;

    poolName(overrides?: CallOverrides): Promise<[string]>;

    poolTokenTransfer(
      isLongToken: boolean,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    poolTokens(overrides?: CallOverrides): Promise<[[string, string]]>;

    poolUpkeep(
      _oldPrice: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    quoteToken(overrides?: CallOverrides): Promise<[string]>;

    quoteTokenTransfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    quoteTokenTransferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setNewPoolBalances(
      _longBalance: BigNumberish,
      _shortBalance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settlementEthOracle(overrides?: CallOverrides): Promise<[string]>;

    shortBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferGovernance(
      _governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateFeeAddress(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateInterval(overrides?: CallOverrides): Promise<[number]>;

    updateSecondaryFeeAddress(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  balances(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      _shortBalance: BigNumber;
      _longBalance: BigNumber;
    }
  >;

  burnTokens(
    isLongToken: boolean,
    amount: BigNumberish,
    burner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimGovernance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  frontRunningInterval(overrides?: CallOverrides): Promise<number>;

  getOraclePrice(overrides?: CallOverrides): Promise<BigNumber>;

  getUpkeepInformation(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, BigNumber] & {
      _latestPrice: BigNumber;
      _data: string;
      _lastPriceTimestamp: BigNumber;
      _updateInterval: BigNumber;
    }
  >;

  initialize(
    initialization: {
      _owner: string;
      _keeper: string;
      _oracleWrapper: string;
      _settlementEthOracle: string;
      _longToken: string;
      _shortToken: string;
      _poolCommitter: string;
      _invariantCheckContract: string;
      _poolName: string;
      _frontRunningInterval: BigNumberish;
      _updateInterval: BigNumberish;
      _leverageAmount: BigNumberish;
      _fee: BigNumberish;
      _feeAddress: string;
      _secondaryFeeAddress: string;
      _quoteToken: string;
      _secondaryFeeSplitPercent: BigNumberish;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  intervalPassed(overrides?: CallOverrides): Promise<boolean>;

  lastPriceTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  leverageAmount(overrides?: CallOverrides): Promise<string>;

  longBalance(overrides?: CallOverrides): Promise<BigNumber>;

  mintTokens(
    isLongToken: boolean,
    amount: BigNumberish,
    burner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  oracleWrapper(overrides?: CallOverrides): Promise<string>;

  payKeeperFromBalances(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  poolCommitter(overrides?: CallOverrides): Promise<string>;

  poolName(overrides?: CallOverrides): Promise<string>;

  poolTokenTransfer(
    isLongToken: boolean,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  poolTokens(overrides?: CallOverrides): Promise<[string, string]>;

  poolUpkeep(
    _oldPrice: BigNumberish,
    _newPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  quoteToken(overrides?: CallOverrides): Promise<string>;

  quoteTokenTransfer(
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  quoteTokenTransferFrom(
    from: string,
    to: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setKeeper(
    _keeper: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setNewPoolBalances(
    _longBalance: BigNumberish,
    _shortBalance: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settlementEthOracle(overrides?: CallOverrides): Promise<string>;

  shortBalance(overrides?: CallOverrides): Promise<BigNumber>;

  transferGovernance(
    _governance: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateFeeAddress(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateInterval(overrides?: CallOverrides): Promise<number>;

  updateSecondaryFeeAddress(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    balances(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        _shortBalance: BigNumber;
        _longBalance: BigNumber;
      }
    >;

    burnTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    claimGovernance(overrides?: CallOverrides): Promise<void>;

    frontRunningInterval(overrides?: CallOverrides): Promise<number>;

    getOraclePrice(overrides?: CallOverrides): Promise<BigNumber>;

    getUpkeepInformation(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, BigNumber] & {
        _latestPrice: BigNumber;
        _data: string;
        _lastPriceTimestamp: BigNumber;
        _updateInterval: BigNumber;
      }
    >;

    initialize(
      initialization: {
        _owner: string;
        _keeper: string;
        _oracleWrapper: string;
        _settlementEthOracle: string;
        _longToken: string;
        _shortToken: string;
        _poolCommitter: string;
        _invariantCheckContract: string;
        _poolName: string;
        _frontRunningInterval: BigNumberish;
        _updateInterval: BigNumberish;
        _leverageAmount: BigNumberish;
        _fee: BigNumberish;
        _feeAddress: string;
        _secondaryFeeAddress: string;
        _quoteToken: string;
        _secondaryFeeSplitPercent: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    intervalPassed(overrides?: CallOverrides): Promise<boolean>;

    lastPriceTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    leverageAmount(overrides?: CallOverrides): Promise<string>;

    longBalance(overrides?: CallOverrides): Promise<BigNumber>;

    mintTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    oracleWrapper(overrides?: CallOverrides): Promise<string>;

    payKeeperFromBalances(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    poolCommitter(overrides?: CallOverrides): Promise<string>;

    poolName(overrides?: CallOverrides): Promise<string>;

    poolTokenTransfer(
      isLongToken: boolean,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    poolTokens(overrides?: CallOverrides): Promise<[string, string]>;

    poolUpkeep(
      _oldPrice: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    quoteToken(overrides?: CallOverrides): Promise<string>;

    quoteTokenTransfer(
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    quoteTokenTransferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setKeeper(_keeper: string, overrides?: CallOverrides): Promise<void>;

    setNewPoolBalances(
      _longBalance: BigNumberish,
      _shortBalance: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    settlementEthOracle(overrides?: CallOverrides): Promise<string>;

    shortBalance(overrides?: CallOverrides): Promise<BigNumber>;

    transferGovernance(
      _governance: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateFeeAddress(account: string, overrides?: CallOverrides): Promise<void>;

    updateInterval(overrides?: CallOverrides): Promise<number>;

    updateSecondaryFeeAddress(
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    FeeAddressUpdated(
      oldAddress?: string | null,
      newAddress?: string | null
    ): TypedEventFilter<
      [string, string],
      { oldAddress: string; newAddress: string }
    >;

    GovernanceAddressChanged(
      oldAddress?: string | null,
      newAddress?: string | null
    ): TypedEventFilter<
      [string, string],
      { oldAddress: string; newAddress: string }
    >;

    KeeperAddressChanged(
      oldAddress?: string | null,
      newAddress?: string | null
    ): TypedEventFilter<
      [string, string],
      { oldAddress: string; newAddress: string }
    >;

    PoolInitialized(
      longToken?: string | null,
      shortToken?: string | null,
      quoteToken?: null,
      poolName?: null
    ): TypedEventFilter<
      [string, string, string, string],
      {
        longToken: string;
        shortToken: string;
        quoteToken: string;
        poolName: string;
      }
    >;

    PoolRebalance(
      shortBalanceChange?: null,
      longBalanceChange?: null,
      shortFeeAmount?: null,
      longFeeAmount?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        shortBalanceChange: BigNumber;
        longBalanceChange: BigNumber;
        shortFeeAmount: BigNumber;
        longFeeAmount: BigNumber;
      }
    >;

    PriceChangeError(
      startPrice?: BigNumberish | null,
      endPrice?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { startPrice: BigNumber; endPrice: BigNumber }
    >;

    ProvisionalGovernanceChanged(
      newAddress?: string | null
    ): TypedEventFilter<[string], { newAddress: string }>;

    SecondaryFeeAddressUpdated(
      oldAddress?: string | null,
      newAddress?: string | null
    ): TypedEventFilter<
      [string, string],
      { oldAddress: string; newAddress: string }
    >;
  };

  estimateGas: {
    balances(overrides?: CallOverrides): Promise<BigNumber>;

    burnTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    frontRunningInterval(overrides?: CallOverrides): Promise<BigNumber>;

    getOraclePrice(overrides?: CallOverrides): Promise<BigNumber>;

    getUpkeepInformation(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      initialization: {
        _owner: string;
        _keeper: string;
        _oracleWrapper: string;
        _settlementEthOracle: string;
        _longToken: string;
        _shortToken: string;
        _poolCommitter: string;
        _invariantCheckContract: string;
        _poolName: string;
        _frontRunningInterval: BigNumberish;
        _updateInterval: BigNumberish;
        _leverageAmount: BigNumberish;
        _fee: BigNumberish;
        _feeAddress: string;
        _secondaryFeeAddress: string;
        _quoteToken: string;
        _secondaryFeeSplitPercent: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    intervalPassed(overrides?: CallOverrides): Promise<BigNumber>;

    lastPriceTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    leverageAmount(overrides?: CallOverrides): Promise<BigNumber>;

    longBalance(overrides?: CallOverrides): Promise<BigNumber>;

    mintTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    oracleWrapper(overrides?: CallOverrides): Promise<BigNumber>;

    payKeeperFromBalances(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    poolCommitter(overrides?: CallOverrides): Promise<BigNumber>;

    poolName(overrides?: CallOverrides): Promise<BigNumber>;

    poolTokenTransfer(
      isLongToken: boolean,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    poolTokens(overrides?: CallOverrides): Promise<BigNumber>;

    poolUpkeep(
      _oldPrice: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    quoteToken(overrides?: CallOverrides): Promise<BigNumber>;

    quoteTokenTransfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    quoteTokenTransferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setNewPoolBalances(
      _longBalance: BigNumberish,
      _shortBalance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settlementEthOracle(overrides?: CallOverrides): Promise<BigNumber>;

    shortBalance(overrides?: CallOverrides): Promise<BigNumber>;

    transferGovernance(
      _governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateFeeAddress(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateInterval(overrides?: CallOverrides): Promise<BigNumber>;

    updateSecondaryFeeAddress(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balances(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    burnTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimGovernance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    frontRunningInterval(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOraclePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUpkeepInformation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      initialization: {
        _owner: string;
        _keeper: string;
        _oracleWrapper: string;
        _settlementEthOracle: string;
        _longToken: string;
        _shortToken: string;
        _poolCommitter: string;
        _invariantCheckContract: string;
        _poolName: string;
        _frontRunningInterval: BigNumberish;
        _updateInterval: BigNumberish;
        _leverageAmount: BigNumberish;
        _fee: BigNumberish;
        _feeAddress: string;
        _secondaryFeeAddress: string;
        _quoteToken: string;
        _secondaryFeeSplitPercent: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    intervalPassed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastPriceTimestamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    leverageAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    longBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintTokens(
      isLongToken: boolean,
      amount: BigNumberish,
      burner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    oracleWrapper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payKeeperFromBalances(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    poolCommitter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolName(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolTokenTransfer(
      isLongToken: boolean,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    poolTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolUpkeep(
      _oldPrice: BigNumberish,
      _newPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    quoteToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    quoteTokenTransfer(
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    quoteTokenTransferFrom(
      from: string,
      to: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setKeeper(
      _keeper: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setNewPoolBalances(
      _longBalance: BigNumberish,
      _shortBalance: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settlementEthOracle(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    shortBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferGovernance(
      _governance: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateFeeAddress(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateInterval(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateSecondaryFeeAddress(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
