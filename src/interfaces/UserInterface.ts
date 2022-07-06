import { HistoryItemInterface } from "./HistoryItemInterface";
import { TransactionInterface } from "./TransactionInterface";

export interface UserInterface {
  email: string;
  invested: number;
  transactions: TransactionInterface[];
  history: HistoryItemInterface[];
  currentToken: string | null;
  terms: boolean;
} 

export interface UserDocument extends UserInterface {
  _id: string;
  __v: number;
}