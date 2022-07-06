export interface TransactionInterface {
  ticker: string;
  type: "buy" | "sell";
  quantity: number;
  entryPrice: number;
  openDate: Date;
  historyItemID: string;
  open: boolean;
}