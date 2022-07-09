import { Dispatch, SetStateAction } from "react";
import { HistoryItemInterface } from "./HistoryItemInterface";
import { AverageTransaction, TransactionInterface } from "./TransactionInterface";

export interface TransactionContextInterface {
  idToEdit: string | null;
  setIdToEdit: Dispatch<SetStateAction<string | null>>;
  transactions: TransactionInterface[];
  fetchTransactions: () => void;
  wallet: AverageTransaction[];
  fetchWallet: () => void;
  history: HistoryItemInterface[];
  fetchHistory: () => void;
  fetchAll: () => void;
}