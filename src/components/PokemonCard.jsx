import { formatPrice } from "@/utils/helpers";

export const PokemonCard = ({ pokemon }) => {
  return (
    <article>
      <h2>{pokemon.name}</h2>
      <span>{pokemon.pokedexId}</span>
      <img src={pokemon.officialImageUrl} alt={pokemon.name} />
      <div>
        {pokemon.types.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </div>
      <p>{formatPrice({ price: pokemon.price, currency: pokemon.currency })}</p>
    </article>
  );
};
