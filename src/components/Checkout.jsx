import { useContext, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BalanceContext, CartContext, PurchasesContext } from "@/contexts";
import { useConversion } from "@/hooks";
import { formatPrice } from "@/utils/helpers";
import { CheckoutItem } from ".";

export const Checkout = () => {
  const { balance, checkoutBalance } = useContext(BalanceContext);
  const { cart, setCart } = useContext(CartContext);
  const { addToPurchases } = useContext(PurchasesContext);

  const navigate = useNavigate();
  const cartWithConversion = useConversion({ balance, cart });
  const [hasInsufficientFunds, setHasInsufficientFunds] = useState(false);

  if (cart.length === 0) {
    return <p className="text-center">No pokemon added to cart</p>;
  }

  const total = cartWithConversion.reduce(
    (accum, current) => accum + parseFloat(current.localPrice.value),
    0,
  );

  const handleClick = () => {
    if (balance.funds - total >= 0) {
      addToPurchases(cart);
      checkoutBalance(total);
      navigate({ to: "/purchases" });
      setCart([]);
    } else {
      setHasInsufficientFunds(true);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
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
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {formatPrice({
                price: total,
                currency: balance.currency,
              })}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mt-8 flex flex-col items-center justify-center space-y-4">
        <Button onClick={handleClick}>Checkout</Button>
        {hasInsufficientFunds && <p>Insufficient funds</p>}
      </div>
    </>
  );
};
