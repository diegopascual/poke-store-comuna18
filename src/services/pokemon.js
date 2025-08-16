import { getPokemonList as getPokemonListApi } from "@/api/pokemon";
import { fetchDataFromUrl } from "@/api/generic";
import { saveToStorage, loadFromStorage } from "@/utils/storage";
import { mapApiResponseToPokemon } from "./helpers";

const getPokemonSpecie = async (pokemon) => {
  const pokemonSpecieResponse = fetchDataFromUrl(pokemon.species.url);
  return pokemonSpecieResponse;
};

export const getPokemonList = async ({ limit = 20, page = 1 }) => {
  const storageKey = `pokemon-list-page-${page}`;
  const cachedData = loadFromStorage(storageKey);

  if (cachedData) return cachedData;

  const pokemonListResponse = await getPokemonListApi({
    limit,
    offset: (page - 1) * limit,
  });

  const pokemonPromises = pokemonListResponse.results.map((pokemon) =>
    fetchDataFromUrl(pokemon.url),
  );

  const pokemonResponses = await Promise.all(pokemonPromises);
  const pokemonSpeciePromises = pokemonResponses.map(getPokemonSpecie);
  const pokemonSpeciesResponses = await Promise.all(pokemonSpeciePromises);
  const pokemonWithSpecie = pokemonResponses.map((pokemon) => {
    const specie = pokemonSpeciesResponses.find(
      (specie) => specie.name === pokemon.species.name,
    );

    return { pokemon, pokemonSpecie: specie };
  });

  const pokemonResults = pokemonWithSpecie.map(mapApiResponseToPokemon);

  saveToStorage(storageKey, pokemonResults);

  return pokemonResults;
};
