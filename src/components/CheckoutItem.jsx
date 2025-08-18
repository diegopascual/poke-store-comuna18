import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/utils/helpers";

export const CheckoutItem = ({ pokemon }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
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
