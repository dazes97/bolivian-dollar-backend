import { P2pParsedResponse, P2pRequestOptions } from "../interfaces/binance";
import { DatabaseAdapater } from "../database/adapter-database";
export class CurrentPriceService {
  private databaseAdapater: DatabaseAdapater;
  constructor() {
    this.databaseAdapater = new DatabaseAdapater();
  }

  async getCurrentDollarPrice(
    BinanceRequestOptions: P2pRequestOptions
  ): Promise<P2pParsedResponse> {
    const { fiat, tradeType, asset } = BinanceRequestOptions;
    const [response] = await this.databaseAdapater.execute(
      `SELECT ROUND(value,2) AS value, created_at as date, trade_type as tradeType, fiat
      FROM 
      price_history 
      WHERE fiat =? AND asset =? AND trade_type =? AND deleted_at IS NULL ORDER BY date DESC LIMIT 1`,
      [fiat, asset, tradeType]
    );
    return response as P2pParsedResponse;
  }
}

// return {
//   value: averageValue,
//   fiat,
//   date: DateTime.now().toJSDate(),
//   tradeType: tradeType,
// };
