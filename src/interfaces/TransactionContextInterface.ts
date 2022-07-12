import { Dispatch, SetStateAction } from "react";
import { HistoryItemInterface } from "./HistoryItemInterface";
import { AverageTransaction, TransactionInterface } from "./TransactionInterface";

export interface TransactionContextInterface {
  idToEdit: string | null;
  setIdToEdit: Dispatch<SetStateAction<string | null>>;
  idToSell: string | null;
  setIdToSell: Dispatch<SetStateAction<string | null>>;
  transactions: TransactionInterface[];
  setTransactions: Dispatch<SetStateAction<TransactionInterface[]>>;
  wallet: AverageTransaction[];
  setWallet: Dispatch<SetStateAction<AverageTransaction[]>>;
  history: HistoryItemInterface[];
  setHistory: Dispatch<SetStateAction<HistoryItemInterface[]>>;
  loadingTable: boolean;
  setLoadingTable: Dispatch<SetStateAction<boolean>>;
}