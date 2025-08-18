import { frankfurterApiInstance } from "./config";

export const convert = async ({ from, to, amount }) => {
  const response = await frankfurterApiInstance.get(
    `/latest?base=${from}&symbols=${to}`,
  );

  const convertedAmount = (amount * response.data.rates[to]).toFixed(2);
  return convertedAmount;
};
