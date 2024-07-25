import { P2pParsedResponse, P2pRequestOptions } from "../interfaces";
import { calculateAveragePrice } from "../utils/value-calculator";
import { DatabaseAdapater } from "../database/adapter-database";
import { BinanceRequest } from "../utils/http-request";
import { Datum } from "../interfaces/binance/p2p-original-response.interface";
export class PriceHistoryService {
  private databaseAdapater: DatabaseAdapater;
  constructor() {
    this.databaseAdapater = new DatabaseAdapater();
  }

  async getCurrentDollarPriceScheduled(
    BinanceRequestOptions: P2pRequestOptions
  ): Promise<void> {
    const { fiat, tradeType, asset } = BinanceRequestOptions;
    const dataToInsert = await this.getBinanceMarketPrice(
      BinanceRequestOptions
    );
    const averageValue = calculateAveragePrice(dataToInsert).toFixed(2);
    if (!averageValue || Number(averageValue) === 0) return;
    await this.databaseAdapater.execute(
      "INSERT INTO price_history (value,fiat,asset,trade_type) VALUES (?,?,?,?)",
      [averageValue, fiat, asset, tradeType]
    );
  }
  public async getBinanceMarketPrice(
    BinanceRequestOptions: P2pRequestOptions
  ): Promise<P2pParsedResponse[]> {
    const { fiat, tradeType } = BinanceRequestOptions;
    const { data } = await BinanceRequest.fetchP2pBinance(
      BinanceRequestOptions
    );
    const parsedP2pResponse: P2pParsedResponse[] = data.map((datum: Datum) => ({
      fiat,
      tradeType,
      date: new Date(),
      value: Number(datum.adv.price),
    }));
    return parsedP2pResponse;
  }
  async setPreviousDayDollarPrice(options: P2pRequestOptions): Promise<void> {
    const { fiat, tradeType, asset } = options;
    await this.databaseAdapater.execute(
      "CALL sp_store_previous_day_price(?,?,?)",
      [tradeType, fiat, asset]
    );
  }
}
