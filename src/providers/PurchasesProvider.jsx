import { useState, useEffect } from "react";
import { PurchasesContext } from "@/contexts";
import { loadFromStorage, saveToStorage } from "@/utils/storage";

const PURCHASES_KEY = "purchases";

export const PurchasesProvider = ({ children }) => {
  const [purchases, setPurchases] = useState(() => {
    const purchasesStorage = loadFromStorage(PURCHASES_KEY);
    if (purchasesStorage) return purchasesStorage;

    return [];
  });

  useEffect(() => {
    saveToStorage(PURCHASES_KEY, purchases);
  }, [purchases]);

  const purchasesIds = purchases.map((pokemon) => pokemon.id);

  const addToPurchases = (cart) => {
    setPurchases((prevPurchases) => [...prevPurchases, ...cart]);
  };

  return (
    <PurchasesContext.Provider
      value={{
        purchases,
        purchasesIds,
        addToPurchases,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
