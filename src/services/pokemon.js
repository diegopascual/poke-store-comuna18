import { getPokemonList as getPokemonListApi } from "@/api/pokemon";
import { fetchDataFromUrl } from "@/api/generic";
import { mapApiResponseToPokemon } from "./helpers";

export const getPokemonList = async ({ limit = 20, page = 1 }) => {
  const pokemonListResponse = await getPokemonListApi({
    limit,
    offset: (page - 1) * limit,
  });

  const pokemonPromises = pokemonListResponse.results.map((pokemon) =>
    fetchDataFromUrl(pokemon.url)
  );

  const pokemonResponses = await Promise.all(pokemonPromises);
  const pokemonResults = pokemonResponses.map(mapApiResponseToPokemon);

  return pokemonResults;
};
