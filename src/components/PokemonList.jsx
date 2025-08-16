import { Fragment } from "react";
import { PokemonCard } from ".";

export const PokemonList = ({ pokemonList = [] }) => {
  if (pokemonList.length === 0) {
    return <p>No Pokemon available</p>;
  }

  return (
    <section className="grid-cols-2 gap-6 space-y-6 px-8 md:m-0 md:grid md:space-y-0 xl:grid-cols-4">
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
