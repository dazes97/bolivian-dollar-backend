import { APIGatewayProxyResult, Handler } from "aws-lambda";

const ErrorHandler = (handler: Handler): Handler => {
  return async (event, context, callback): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event, context, callback);
    } catch (error) {
      console.error("Error occurred:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: "error",
          message: error.message ?? "Internal Server Error",
        }),
      };
    }
  };
};

export default ErrorHandler;
