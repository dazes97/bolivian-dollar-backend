import { P2pParsedResponse, P2pRequestOptions } from "../interfaces";
import { CurrentPriceService } from "../services/current-price-service";
export class CurrentPriceController {
  private currentPriceService: CurrentPriceService;
  constructor() {
    this.currentPriceService = new CurrentPriceService();
  }
  public async getCurrentDollarPrice(
    P2pRequestOptions: P2pRequestOptions
  ): Promise<P2pParsedResponse> {
    return await this.currentPriceService.getCurrentDollarPrice(
      P2pRequestOptions
    );
  }
}
