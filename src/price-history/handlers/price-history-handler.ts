import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { P2pRequestOptions } from "../interfaces/binance";
import { PriceHistoryController } from "../controllers/price-history-controller";
import ErrorHandler from "../utils/error-handler";

const priceHistoryController = new PriceHistoryController();
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

const getCurrentDollarPriceScheduled: Handler =
  async (): Promise<APIGatewayProxyResult> => {
    await Promise.all([
      priceHistoryController.getCurrentDollarPriceScheduled(buyOptions),
      priceHistoryController.getCurrentDollarPriceScheduled(sellOptions),
    ]);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          status: "success",
          message: "Current dollar price scheduled",
        },
        null,
        2
      ),
    };
  };
const setPreviousDayDollarPrice: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  await Promise.all([
    priceHistoryController.setPreviousDayDollarPrice(buyOptions),
    priceHistoryController.setPreviousDayDollarPrice(sellOptions),
  ]);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        statusbar: "success",
        message: "Previous day dollar price scheduled",
      },
      null,
      2
    ),
  };
};
const getCurrentDollarPrice: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "getCurrentDollarPrice",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.getCurrentDollarPriceScheduled = ErrorHandler(
  getCurrentDollarPriceScheduled
);
module.exports.setPreviousDayDollarPrice = ErrorHandler(
  setPreviousDayDollarPrice
);
module.exports.getCurrentDollarPrice = ErrorHandler(getCurrentDollarPrice);
