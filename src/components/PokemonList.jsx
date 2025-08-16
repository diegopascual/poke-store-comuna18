import { Fragment } from "react";
import { PokemonCard } from ".";

export const PokemonList = ({ pokemonList = [] }) => {
  if (pokemonList.length === 0) {
    return <p>No Pokemon available</p>;
  }

  return (
    <section className="mx-auto max-w-xs space-y-6">
      {pokemonList.pages.map((page, index) => {
        return (
          <Fragment key={index}>
            {page.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Fragment>
        );
      })}
    </section>
  );
};
