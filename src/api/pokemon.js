import { pokeApiInstance } from "./config";

export const getPokemonList = async ({ limit, offset }) => {
  const response = await pokeApiInstance.get("/pokemon", {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getPokemonByIdOrName = async (idOrName) => {
  const response = await pokeApiInstance.get(`/pokemon/${idOrName}`);
  return response.data;
};
