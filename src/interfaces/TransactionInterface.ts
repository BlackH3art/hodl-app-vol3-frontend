import { CoinDataInterface } from "./CoinDataInterface";

export interface TransactionInterface {
  _id: string;
  ticker: string;
  type: "buy" | "sell";
  quantity: number;
  entryPrice: number;
  openDate: Date;
  historyItemID: string;
  open: boolean;
}

export interface AverageTransaction {
  _id: string;
  totalInvested: number;
  totalQuantity: number;
  avgPrice: number;
  capital?: number;
  coinData?: CoinDataInterface;
}