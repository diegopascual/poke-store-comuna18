import { useContext } from "react";
import { CartContext } from "@/contexts";
import { PokemonCard } from ".";

export const PokemonList = ({ pokemonList = [] }) => {
  const { cartIds } = useContext(CartContext);

  if (pokemonList.length === 0) {
    return <p>No Pokemon available</p>;
  }

  const pokemonListWithCartStatus = pokemonList.map((pokemon) => ({
    ...pokemon,
    isInCart: cartIds.includes(pokemon.id),
  }));

  return pokemonListWithCartStatus.map((pokemon) => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} />
  ));
};
