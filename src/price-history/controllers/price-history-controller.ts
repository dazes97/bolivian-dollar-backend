import { APIGatewayProxyResult } from "aws-lambda";
import { PriceHistoryService } from "../services/price-history-service";
import { P2pRequestOptions } from "../interfaces";
import { responseHandler } from "../utils/response-handler";
export class PriceHistoryController {
  private priceHistoryService: PriceHistoryService;
  constructor() {
    this.priceHistoryService = new PriceHistoryService();
  }
  public async getCurrentDollarPriceScheduled(
    buyOptions: P2pRequestOptions,
    sellOptions: P2pRequestOptions
  ): Promise<APIGatewayProxyResult> {
    const [buyResponse, sellResponse] = await Promise.all([
      this.priceHistoryService.getCurrentDollarPriceScheduled(buyOptions),
      this.priceHistoryService.getCurrentDollarPriceScheduled(sellOptions),
    ]);
    return responseHandler(200, { buy: buyResponse, sell: sellResponse });
  }
  public async setPreviousDayDollarPrice(
    buyOptions: P2pRequestOptions,
    sellOptions: P2pRequestOptions
  ): Promise<APIGatewayProxyResult> {
    const [buyResponse, sellResponse] = await Promise.all([
      this.priceHistoryService.setPreviousDayDollarPrice(buyOptions),
      this.priceHistoryService.setPreviousDayDollarPrice(sellOptions),
    ]);
    return responseHandler(200, { buy: buyResponse, sell: sellResponse });
  }
  public async getPreviousDaysDollarPrice(
    days: number,
    requestOptions: P2pRequestOptions
  ): Promise<APIGatewayProxyResult> {
    return responseHandler(
      200,
      await this.getPreviousDaysDollarPrice(days, requestOptions)
    );
  }
}
