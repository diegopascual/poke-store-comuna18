import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/utils/helpers";
import { POKEMON_TYPES_COLORS } from "@/constants/pokemon";

export const PokemonCard = ({ pokemon }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <p className="flex justify-between">
            <span>{pokemon.name}</span>
            <span>{pokemon.pokedexId}</span>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={pokemon.officialImageUrl}
          alt={pokemon.name}
          className="m-auto w-3xs"
        />
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold">
            {formatPrice({ price: pokemon.price, currency: pokemon.currency })}
          </p>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type} className={POKEMON_TYPES_COLORS[type]}>
                {type}
              </Badge>
            ))}
          </div>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {pokemon.description}
        </p>
      </CardContent>
    </Card>
  );
};
