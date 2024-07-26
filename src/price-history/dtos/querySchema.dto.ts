import { z } from "zod";
export const querySchemaDto = z.object({
  days: z.coerce.number().lte(365).optional(),
  asset: z
    .string({ message: "String is required" })
    .max(5, { message: "Must be 5 or fewer characters long" })
    .trim()
    .toUpperCase(),
  fiat: z
    .string({ message: "String is required" })
    .max(3, { message: "Must be 3 or fewer characters long" })
    .trim()
    .toUpperCase(),
  tradeType: z.enum(["BUY", "SELL"], {
    message: "Must be either 'BUY' or 'SELL'",
  }),
});
