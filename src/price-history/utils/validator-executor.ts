import { z } from "zod";
export const validatorExecutor = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
) => {
  const responseValidator = schema.safeParse(data);
  if (!responseValidator.success) {
    console.log("schema:", JSON.stringify(responseValidator.error));
    throw new Error("Invalid request parameters");
  }
  return responseValidator;
};
