import { P2pParsedResponse } from "../interfaces/binance";
export const calculateAveragePrice = (values: P2pParsedResponse[]): number => {
  if (values.length === 0) return 0;
  const filteredValues = values.map((item: P2pParsedResponse) => item.value);
  return filteredValues.reduce((acc, curr) => acc + curr, 0) / values.length;
};
