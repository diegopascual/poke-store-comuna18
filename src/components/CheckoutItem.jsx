import { useContext } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CartContext } from "@/contexts";
import { formatPrice } from "@/utils/helpers";

export const CheckoutItem = ({ pokemon }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <TableRow>
      <TableCell>
        <Button
          size="icon"
          className="size-8 hover:cursor-pointer"
          onClick={() => {
            removeFromCart(pokemon.id);
          }}
        >
          <Trash2 />
        </Button>
      </TableCell>
      <TableCell>
        <img src={pokemon.defaultImageUrl} alt={pokemon.name} />
      </TableCell>
      <TableCell>{pokemon.name}</TableCell>
      <TableCell className="text-right">
        {formatPrice({
          price: pokemon.price.value,
          currency: pokemon.price.currency,
        })}
      </TableCell>
      <TableCell className="text-right">
        {formatPrice({
          price: pokemon.localPrice.value,
          currency: pokemon.localPrice.currency,
        })}
      </TableCell>
    </TableRow>
  );
};
