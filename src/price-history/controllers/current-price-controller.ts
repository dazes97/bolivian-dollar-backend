import { P2pRequestOptions } from "../interfaces/binance";
import { CurrentPriceService } from "../services/current-price-service";
export class CurrentPriceController {
  private currentPriceService: CurrentPriceService;
  constructor() {
    this.currentPriceService = new CurrentPriceService();
  }
  public async getCurrentDollarPrice(P2pRequestOptions: P2pRequestOptions) {
    return await this.currentPriceService.getCurrentDollarPrice(
      P2pRequestOptions
    );
  }
}
