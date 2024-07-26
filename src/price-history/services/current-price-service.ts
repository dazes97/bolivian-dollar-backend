import { P2pParsedResponse, P2pRequestOptions } from "../interfaces";
import { DatabaseAdapater } from "../database/adapter-database";
export class CurrentPriceService {
  private databaseAdapater: DatabaseAdapater;
  constructor() {
    this.databaseAdapater = new DatabaseAdapater();
  }

  async getCurrentDollarPrice(
    requestOptions: P2pRequestOptions
  ): Promise<P2pParsedResponse> {
    const { fiat, tradeType, asset } = requestOptions;
    const [response] = await this.databaseAdapater.executeStoredProcedure(
      "CALL sp_get_current_currency_price(?,?,?)",
      [tradeType, fiat, asset]
    );
    return response[0][0];
  }
  async getCurrentDayDollarPrice(
    requestOptions: P2pRequestOptions
  ): Promise<P2pParsedResponse[]> {
    const { fiat, tradeType, asset } = requestOptions;
    const [response] = await this.databaseAdapater.executeStoredProcedure(
      "CALL sp_get_current_detailed_price(?,?,?)",
      [tradeType, fiat, asset]
    );
    return response[0];
  }
}
