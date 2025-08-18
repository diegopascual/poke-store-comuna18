import { useState, useEffect } from "react";
import { RANGE_PRICES } from "@/constants/balance";
import { BalanceContext } from "@/contexts";
import { getRandomPrice } from "@/utils/helpers";
import { loadFromStorage, saveToStorage } from "@/utils/storage";

const BALANCE_KEY = "balance";

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const balanceStorage = loadFromStorage(BALANCE_KEY);
    if (!balanceStorage) {
      return {
        funds: Math.floor(getRandomPrice(RANGE_PRICES.MIN, RANGE_PRICES.MAX)),
        currency: "MXN",
      };
    }

    return balanceStorage;
  });

  useEffect(() => {
    saveToStorage(BALANCE_KEY, balance);
  }, [balance]);

  const addFunds = (funds) => {
    setBalance((prevBalance) => ({
      ...prevBalance,
      funds: prevBalance.funds + funds,
    }));
  };

  const checkoutBalance = (totalCheckout) => {
    setBalance((prevBalance) => ({
      ...prevBalance,
      funds: prevBalance.funds - totalCheckout,
    }));
  };

  return (
    <BalanceContext.Provider value={{ balance, addFunds, checkoutBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
