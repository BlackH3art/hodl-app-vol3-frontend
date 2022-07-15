import { HistoryItemInterface } from "./HistoryItemInterface";
import { TransactionInterface } from "./TransactionInterface";

export interface UserInterface {
  email: string;
  invested: number;
  currentToken: string | null;
} 

export interface UserDocument extends UserInterface {
  _id: string;
  __v: number;
}

export interface UserResponseInterface {
  user: UserInterface;
  token: string;
}