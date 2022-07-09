export interface HistoryItemInterface {
  _id: string;
  ticker: string;
  type: "buy" | "sell";
  sellingPrice: number;
  entryPrice: number;
  quantity: number;
  sellingQuantity: number; 
  invested: number;
  gain: number;
  closeDate: Date;
  openDate: Date;
}