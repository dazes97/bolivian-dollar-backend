export interface P2pRequestOptions {
  tradeType: "BUY" | "SELL";
  fiat: "BOB" | "USD";
  asset: "USDT" | "BTC" | "ETH";
  rows?: number;
  publisherType?: "merchant" | null;
}
