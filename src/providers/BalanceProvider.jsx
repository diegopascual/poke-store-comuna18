import { useState, useEffect } from "react";
import { BalanceContext } from "@/contexts/BalanceContext";
import { loadFromStorage, saveToStorage } from "@/utils/storage";
import { getRandomPrice } from "@/utils/helpers";

const BALANCE_KEY = "balance";

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const balanceStorage = loadFromStorage(BALANCE_KEY);
    if (!balanceStorage) {
      const MAX_PRICE = 1000;
      const MIN_PRICE = 10000;

      return {
        balance: Math.floor(getRandomPrice(MIN_PRICE, MAX_PRICE)),
        currency: "MXN",
      };
    }

    return balanceStorage;
  });

  useEffect(() => {
    saveToStorage(BALANCE_KEY, balance);
  }, [balance]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
