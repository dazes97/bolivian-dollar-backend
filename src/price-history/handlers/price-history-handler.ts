import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { PriceHistoryController } from "../controllers/price-history-controller";
import { P2pRequestOptions } from "../interfaces";
import { validatorExecutor } from "../utils/validator-executor";
import { querySchemaDto } from "../dtos/querySchema.dto";
import ErrorHandler from "../utils/error-handler";

const priceHistoryController = new PriceHistoryController();
const buyOptions: P2pRequestOptions = {
  asset: "USDT",
  fiat: "BOB",
  tradeType: "BUY",
  publisherType: null,
  rows: 10,
};
const sellOptions: P2pRequestOptions = {
  asset: "USDT",
  fiat: "BOB",
  tradeType: "SELL",
  publisherType: null,
  rows: 10,
};

const getCurrentDollarPriceScheduled: Handler =
  async (): Promise<APIGatewayProxyResult> => {
    return await priceHistoryController.getCurrentDollarPriceScheduled(
      buyOptions,
      sellOptions
    );
  };
const setPreviousDayDollarPrice: Handler =
  async (): Promise<APIGatewayProxyResult> => {
    return await priceHistoryController.setPreviousDayDollarPrice(
      buyOptions,
      sellOptions
    );
  };
const getPreviousDaysDollarPrice: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  validatorExecutor(querySchemaDto, event.queryStringParameters);
  const requestOptions =
    event.queryStringParameters as unknown as P2pRequestOptions;
  return await priceHistoryController.getPreviousDaysDollarPrice(
    30,
    requestOptions
  );
};

module.exports.getCurrentDollarPriceScheduled = ErrorHandler(
  getCurrentDollarPriceScheduled
);
module.exports.setPreviousDayDollarPrice = ErrorHandler(
  setPreviousDayDollarPrice
);
module.exports.getPreviousDaysDollarPrice = ErrorHandler(
  getPreviousDaysDollarPrice
);
