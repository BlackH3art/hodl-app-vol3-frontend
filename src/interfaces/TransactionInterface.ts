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