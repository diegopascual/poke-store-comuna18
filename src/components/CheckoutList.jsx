import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BalanceContext, CartContext } from "@/contexts";
import { useConversion } from "@/hooks/useConversion";
import { formatPrice } from "@/utils/helpers";
import { CheckoutItem } from ".";

export const CheckoutList = () => {
  const { balance } = useContext(BalanceContext);
  const { cart } = useContext(CartContext);
  const cartWithConversion = useConversion({ balance, cart });

  if (cart.length === 0) {
    return <p className="text-center">No pokemon added to cart</p>;
  }

  const total = cartWithConversion.reduce(
    (accum, current) => accum + parseFloat(current.localPrice.value),
    0,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Pokemon</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Local price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartWithConversion.map((pokemon) => (
          <CheckoutItem key={pokemon.id} pokemon={pokemon} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {formatPrice({
              price: total,
              currency: balance.currency,
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
