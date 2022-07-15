import { CoinDataInterface } from "../interfaces/CoinDataInterface";
import { AverageTransaction } from "../interfaces/TransactionInterface";

export const mockData: CoinDataInterface[] = [
  { name: "Bitcoin", ticker: "BTC", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", currentPrice: 20265.39, change1h: 0.15, change24h: -5.32, change7d: 22.12 },
  { name: "Ethereum", ticker: "ETH", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", currentPrice: 1089.43, change1h: 0.11, change24h: -4.32, change7d: 16.17 },
  { name: "Orion protocol", ticker: "ORN", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5631.png", currentPrice: 1.03, change1h: 0.07, change24h: -4.22, change7d: 17.33 },
  { name: "Cardano", ticker: "ADA", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png", currentPrice: 0.46, change1h: 1.07, change24h: -3.11, change7d: -1.09 },
  { name: "Chiliz", ticker: "CHZ", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/4066.png", currentPrice: 0.16, change1h: 1.11, change24h: -7.88, change7d: -2.33 },
  { name: "Binance Coin", ticker: "BNB", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png", currentPrice: 235.67, change1h: -0.55, change24h: 12.80, change7d: 12.33 },
  { name: "VeChain", ticker: "VET", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3077.png", currentPrice: 0.0217, change1h: -1.08, change24h: 0, change7d: 9.89 },
  { name: "Solana", ticker: "SOL", logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png", currentPrice: 38.0217, change1h: -1.08, change24h: 0, change7d: 9.89 },
]

export const averageWallet: AverageTransaction[] = [
  { _id: "BTC", avgPrice: 7643.62, totalQuantity: 2.123225, totalInvested: 32323.23 },
  { _id: "ETH", avgPrice: 712.76, totalQuantity: 4.1235235, totalInvested: 234.23 },
  { _id: "BNB", avgPrice: 41.22, totalQuantity: 22.645323, totalInvested: 25235.23 },
  { _id: "ADA", avgPrice: 0.0512, totalQuantity: 22.645323, totalInvested: 2345.23 },
]