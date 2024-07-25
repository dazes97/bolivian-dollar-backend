import { APIGatewayProxyResult, Handler } from "aws-lambda";
import { CurrentPriceController } from "../controllers/current-price-controller";
import { P2pRequestOptions } from "../interfaces";
import ErrorHandler from "../utils/error-handler";

const currentPriceController = new CurrentPriceController();
const buyOptions: P2pRequestOptions = {
  asset: "USDT",
  fiat: "BOB",
  tradeType: "BUY",
};
const sellOptions: P2pRequestOptions = {
  asset: "USDT",
  fiat: "BOB",
  tradeType: "SELL",
};

const getCurrentDollarPrice: Handler =
  async (): Promise<APIGatewayProxyResult> => {
    const [buyData, sellData] = await Promise.all([
      currentPriceController.getCurrentDollarPrice(buyOptions),
      currentPriceController.getCurrentDollarPrice(sellOptions),
    ]);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          status: "success",
          message: "Current dollar price",
          data: { buy: buyData, sell: sellData },
        },
        null,
        2
      ),
    };
  };

module.exports.getCurrentDollarPrice = ErrorHandler(getCurrentDollarPrice);
