export interface P2pRequestOptions {
  fiat: "BOB" | "USD";
  asset: "USDT";
  rows?: number;
  publisherType?: "merchant" | null;
  tradeType: "BUY" | "SELL";
}
