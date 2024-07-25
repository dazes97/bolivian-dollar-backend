import { P2pOriginalResponse, P2pRequestOptions } from "../interfaces";
import fetch, { Response } from "node-fetch";
import { BINANCE_URLS } from "../urls";
import retry from "async-retry";

export class BinanceRequest {
  public static async fetchP2pBinance(
    options: P2pRequestOptions
  ): Promise<P2pOriginalResponse> {
    return retry(
      async (bail: any) => {
        const response: Response = await fetch(BINANCE_URLS.P2P_MARKET, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fiat: options.fiat || "BOB",
            page: 1,
            rows: options.rows || 10,
            tradeType: options.tradeType,
            asset: options.asset || "USDT",
            countries: [],
            proMerchantAds: false,
            shieldMerchantAds: false,
            filterType: "all",
            periods: [],
            additionalKycVerifyFilter: 0,
            publisherType: options.publisherType || "merchant",
            payTypes: [],
            classifies: ["mass", "profession"],
          }),
        });
        if (response.status !== 200) {
          bail(new Error("Failed To fetch data. Status: " + response.status));
        }
        const p2pResponse: P2pOriginalResponse =
          (await response.json()) as P2pOriginalResponse;
        return p2pResponse;
      },
      {
        retries: 3,
        onRetry: (err: Error, attempt: number) => {
          console.error(`Retrying... Attempt ${attempt}:`, err);
        },
      }
    );
  }
}
