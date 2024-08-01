export interface P2pRequestOptions {
  tradeType: "BUY" | "SELL";
  fiat: "BOB" | "USD";
  asset: "USDT" | "BTC" | "ETH";
  rows?: number;
  publisherType?: "merchant" | null; // null for all publishers, merchant for verified merchants only
  additionalKycVerifyFilter?: 0 | 1; // 1 ads with no verification, 0 ads with verification
}
