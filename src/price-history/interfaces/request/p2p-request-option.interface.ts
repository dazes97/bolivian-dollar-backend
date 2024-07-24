export interface P2pRequestOptions {
  fiat: "BOB" | "USD";
  asset: "USDT" | "BTC" | "ETH";
  rows: number;
  publisherType: "merchant" | null;
  tradeType: "BUY" | "SELL";
}
