import {
  capitalize,
  formatNumberToFourDigits,
  getRandomPrice,
} from "@/utils/helpers";

const currencies = ["MXN", "USD", "EUR", "JPY", "GBP"];
const MAX_PRICE = 100;
const MIN_PRICE = 10;

export const mapApiResponseToPokemon = ({
  pokemonResponse,
  pokemonSpecieResponse,
}) => {
  const { id, name, sprites, types } = pokemonResponse;
  const currency = currencies[Math.floor(Math.random() * currencies.length)];
  const price = getRandomPrice(MIN_PRICE, MAX_PRICE).toFixed(2);

  const descriptionEntry = pokemonSpecieResponse.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );

  const description = descriptionEntry
    ? descriptionEntry.flavor_text.replace(/[\n\f]/g, " ")
    : "No description available";

  return {
    id,
    pokedexId: `#${formatNumberToFourDigits(id)}`,
    name: capitalize(name),
    types: types.map((t) => capitalize(t.type.name)),
    defaultImageUrl: sprites.front_default,
    officialImageUrl: sprites.other["official-artwork"].front_default,
    description,
    price: { value: price, currency },
  };
};
