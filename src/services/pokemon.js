import { getPokemonList as getPokemonListApi } from "@/api/pokemon";
import { fetchDataFromUrl } from "@/api/generic";
import { saveToStorage, loadFromStorage } from "@/utils/storage";
import { mapApiResponseToPokemon } from "./helpers";

export const getPokemonList = async ({ limit = 20, page = 1 }) => {
  const storageKey = `pokemon-list-page-${page}`;
  const cachedData = loadFromStorage(storageKey);
  if (cachedData) {
    console.log("Serving from localStorage cache ✨");
    return cachedData;
  }

  const pokemonListResponse = await getPokemonListApi({
    limit,
    offset: (page - 1) * limit,
  });

  const pokemonPromises = pokemonListResponse.results.map((pokemon) =>
    fetchDataFromUrl(pokemon.url)
  );

  const pokemonResponses = await Promise.all(pokemonPromises);
  const pokemonResults = pokemonResponses.map(mapApiResponseToPokemon);

  saveToStorage(storageKey, pokemonResults);

  return pokemonResults;
};
