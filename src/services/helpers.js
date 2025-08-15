import { capitalize, formatNumberToFourDigits } from "@/utils/helpers";

const currencies = ["MXN", "USD", "EUR", "JPY", "GBP"];

export const mapApiResponseToPokemon = ({ id, name, sprites, types }) => {
  const currency = currencies[Math.floor(Math.random() * currencies.length)];
  const price = (Math.random() * 90 + 10).toFixed(2);

  return {
    id,
    pokedexId: `#${formatNumberToFourDigits(id)}`,
    name: capitalize(name),
    types: types.map((t) => capitalize(t.type.name)),
    defaultImageUrl: sprites.front_default,
    officialImageUrl: sprites.other["official-artwork"].front_default,
    price,
    currency,
  };
};
