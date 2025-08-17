import { useState, useEffect } from "react";
import { CartContext } from "@/contexts";
import { loadFromStorage, saveToStorage } from "@/utils/storage";

const CART_KEY = "cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const cartStorage = loadFromStorage(CART_KEY);
    if (cartStorage) return cartStorage;

    return [];
  });

  useEffect(() => {
    saveToStorage(CART_KEY, cart);
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
