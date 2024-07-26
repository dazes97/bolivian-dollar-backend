import { APIGatewayProxyResult } from "aws-lambda";

export const responseHandler = async (
  statusCode: number,
  data: any
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "success",
      message: "successful",
      data: data??null,
    }),
  };
};
