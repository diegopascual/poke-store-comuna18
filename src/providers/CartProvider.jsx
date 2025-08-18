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

  const cartIds = cart.map((pokemon) => pokemon.id);

  const addToCart = (pokemon) => {
    setCart((prevCart) => [...prevCart, pokemon]);
  };

  const removeFromCart = (pokemonId) => {
    setCart((prevCart) =>
      prevCart.filter((pokemon) => pokemon.id !== pokemonId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartIds,
        setCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
