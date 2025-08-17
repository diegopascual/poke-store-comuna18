import {
  getPokemonList as getPokemonListApi,
  getPokemonByIdOrName,
} from "@/api/pokemon";
import { fetchDataFromUrl } from "@/api/generic";
import { saveToStorage, loadFromStorage } from "@/utils/storage";
import { mapApiResponseToPokemon } from "./helpers";

const SEARCHES_KEY = "searches";

const getPokemonSpecie = async (pokemonResponse) => {
  const pokemonSpecieResponse = fetchDataFromUrl(pokemonResponse.species.url);
  return pokemonSpecieResponse;
};

const searchFromLocalStorage = (searchName, storage) => {
  const cachedPokemon = storage.find(
    (poke) => poke.name.toLowerCase() === searchName,
  );

  return cachedPokemon;
};

export const getPokemon = async ({ name, pages }) => {
  const cleanedName = name.trim().toLowerCase();
  console.log(pages);

  for (let i = 1; i <= pages; i++) {
    const storageKey = `pokemon-list-page-${i}`;
    const storage = loadFromStorage(storageKey);
    const cachedPokemon = searchFromLocalStorage(cleanedName, storage);
    if (cachedPokemon) return cachedPokemon;
  }

  const searchesStorage = loadFromStorage(SEARCHES_KEY) || [];
  const cachedPokemon = searchFromLocalStorage(cleanedName, searchesStorage);
  if (cachedPokemon) return cachedPokemon;

  const pokemonResponse = await getPokemonByIdOrName(cleanedName);
  const pokemonSpecieResponse = await getPokemonSpecie(pokemonResponse);
  const pokemon = mapApiResponseToPokemon({
    pokemonResponse,
    pokemonSpecieResponse,
  });

  const updatedSearches = [...searchesStorage, pokemon];
  saveToStorage(SEARCHES_KEY, updatedSearches);

  return pokemon;
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
  const pokemonWithSpecie = pokemonResponses.map((pokemonResponse) => {
    const pokemonSpecieResponse = pokemonSpeciesResponses.find(
      (specie) => specie.name === pokemonResponse.species.name,
    );

    return { pokemonResponse, pokemonSpecieResponse };
  });

  const searchesStorage = loadFromStorage(SEARCHES_KEY) || [];
  const pokemonSearchesResults = [];
  const pokemonResults = pokemonWithSpecie
    .map(mapApiResponseToPokemon)
    .map((poke) => {
      const pokeFromSearches = searchesStorage.find(
        (pokeSearch) => pokeSearch?.name === poke.name,
      );

      pokemonSearchesResults.push(pokeFromSearches?.name);
      return pokeFromSearches || poke;
    });

  const updatedSearches = searchesStorage.filter(
    (poke) => !pokemonSearchesResults.includes(poke?.name),
  );

  saveToStorage(SEARCHES_KEY, updatedSearches);
  saveToStorage(storageKey, pokemonResults);

  return pokemonResults;
};
