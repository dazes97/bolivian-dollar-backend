export interface P2pParsedResponse {
  value: number;
  fiat: "BOB" | "USD";
  date: Date;
  tradeType: "BUY" | "SELL";
}
