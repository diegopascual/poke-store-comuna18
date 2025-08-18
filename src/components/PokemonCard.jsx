import { useContext } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POKEMON_TYPES_COLORS } from "@/constants/pokemon";
import { CartContext } from "@/contexts";
import { formatPrice } from "@/utils/helpers";

export const PokemonCard = ({ pokemon }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const handleClick = () => {
    if (pokemon.isInCart) {
      removeFromCart(pokemon.id);
    } else {
      addToCart(pokemon);
    }
  };

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
        <div className="relative">
          {pokemon.isPurchased ? (
            <Badge className="absolute top-0 right-0">Purchased</Badge>
          ) : (
            <Button
              size="icon"
              className="absolute top-0 right-0 size-8 hover:cursor-pointer"
              onClick={handleClick}
            >
              {pokemon.isInCart ? <Trash2 /> : <Plus />}
            </Button>
          )}

          <img
            src={pokemon.officialImageUrl}
            alt={pokemon.name}
            className="m-auto w-3xs"
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-semibold">
            {formatPrice({
              price: pokemon.price.value,
              currency: pokemon.price.currency,
            })}
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
