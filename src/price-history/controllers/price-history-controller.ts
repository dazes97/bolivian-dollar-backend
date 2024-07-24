import { P2pRequestOptions } from "../interfaces/binance";
import { PriceHistoryService } from "../services/price-history-service";
export class PriceHistoryController {
  private priceHistoryService: PriceHistoryService;
  constructor() {
    this.priceHistoryService = new PriceHistoryService();
  }
  public async getCurrentDollarPriceScheduled(
    P2pRequestOptions: P2pRequestOptions
  ) {
    return await this.priceHistoryService.getCurrentDollarPriceScheduled(
      P2pRequestOptions
    );
  }
  public async setPreviousDayDollarPrice(p2pRequestOptions: P2pRequestOptions) {
    return await this.priceHistoryService.setPreviousDayDollarPrice(
      p2pRequestOptions
    );
  }
}
