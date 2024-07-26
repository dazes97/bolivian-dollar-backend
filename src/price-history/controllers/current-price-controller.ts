import { APIGatewayProxyResult } from "aws-lambda";
import { CurrentPriceService } from "../services/current-price-service";
import { P2pRequestOptions } from "../interfaces";
import { responseHandler } from "../utils/response-handler";
export class CurrentPriceController {
  private currentPriceService: CurrentPriceService;
  constructor() {
    this.currentPriceService = new CurrentPriceService();
  }
  public async getCurrentDollarPrice(
    requestOptions: P2pRequestOptions
  ): Promise<APIGatewayProxyResult> {
    return responseHandler(
      200,
      await this.currentPriceService.getCurrentDollarPrice(requestOptions)
    );
  }
  public async getCurrentDayDollarPrice(
    requestOptions: P2pRequestOptions
  ): Promise<APIGatewayProxyResult> {
    return responseHandler(
      200,
      await this.currentPriceService.getCurrentDayDollarPrice(requestOptions)
    );
  }
}
