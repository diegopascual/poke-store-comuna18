import { useQueries } from "@tanstack/react-query";
import { convert } from "@/api/conversion";

export const useConversion = ({ balance, cart }) => {
  const conversionQueries = useQueries({
    queries: cart.map((pokemon) => ({
      queryKey: ["conversion", pokemon.id, balance.currency],
      queryFn: () =>
        convert({
          from: pokemon.price.currency,
          to: balance.currency,
          amount: pokemon.price.value,
        }),
      enabled: pokemon.price.currency !== balance.currency,
    })),
  });

  const cartWithConversion = cart.map((pokemon, index) => {
    const conversionResult = conversionQueries[index];
    let convertedPrice = null;

    if (pokemon.price.currency === balance.currency) {
      convertedPrice = pokemon.price.value;
    } else if (conversionResult.isSuccess) {
      convertedPrice = conversionResult.data;
    }

    return {
      ...pokemon,
      localPrice: {
        value: convertedPrice,
        currency: balance.currency,
      },
    };
  });

  return cartWithConversion;
};
