import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { CurrentPriceController } from "../controllers/current-price-controller";
import { P2pRequestOptions } from "../interfaces";
import { validatorExecutor } from "../utils/validator-executor";
import { querySchemaDto } from "../dtos/querySchema.dto";
import ErrorHandler from "../utils/error-handler";

const currentPriceController = new CurrentPriceController();

const getCurrentDollarPrice: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const requestOptions =
    event.queryStringParameters as unknown as P2pRequestOptions;
  validatorExecutor(querySchemaDto, event.queryStringParameters);
  return await currentPriceController.getCurrentDollarPrice(requestOptions);
};

const getCurrentDayDollarPrice: Handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  validatorExecutor(querySchemaDto, event.queryStringParameters);
  const requestOptions =
    event.queryStringParameters as unknown as P2pRequestOptions;
  return await currentPriceController.getCurrentDayDollarPrice(requestOptions);
};

module.exports.getCurrentDollarPrice = ErrorHandler(getCurrentDollarPrice);
module.exports.getCurrentDayDollarPrice = ErrorHandler(
  getCurrentDayDollarPrice
);
