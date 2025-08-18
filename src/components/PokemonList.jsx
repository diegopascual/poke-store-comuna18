import { useContext } from "react";
import { CartContext, PurchasesContext } from "@/contexts";
import { PokemonCard } from ".";

export const PokemonList = ({ pokemonList = [] }) => {
  const { cartIds } = useContext(CartContext);
  const { purchasesIds } = useContext(PurchasesContext);

  if (pokemonList.length === 0) {
    return <p className="text-center">No pokemon available</p>;
  }

  const pokemonListWithCartStatus = pokemonList.map((pokemon) => ({
    ...pokemon,
    isInCart: cartIds.includes(pokemon.id),
  }));

  const pokemonListWithPurchasesStatus = pokemonListWithCartStatus.map(
    (pokemon) => ({
      ...pokemon,
      isPurchased: purchasesIds.includes(pokemon.id),
    }),
  );

  return pokemonListWithPurchasesStatus.map((pokemon) => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} />
  ));
};
