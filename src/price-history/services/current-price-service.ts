import { P2pParsedResponse, P2pRequestOptions } from "../interfaces";
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
    const [response] = await this.databaseAdapater.executeStoredProcedure(
      "CALL sp_get_current_currency_price(?,?,?)",
      [tradeType, fiat, asset]
    );
    return response[0][0];
  }
}
