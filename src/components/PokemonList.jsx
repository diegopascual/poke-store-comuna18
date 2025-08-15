import { PokemonCard } from ".";

export const PokemonList = ({ pokemonList = [] }) => {
  if (pokemonList.length === 0) {
    return <p>No Pokemon available</p>;
  }

  return (
    <div>
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
