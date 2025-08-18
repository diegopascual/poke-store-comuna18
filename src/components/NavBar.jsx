import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { BalanceContext, CartContext } from "@/contexts";
import { formatPrice } from "@/utils/helpers";

export const NavBar = () => {
  const { balance } = useContext(BalanceContext);
  const { cartIds } = useContext(CartContext);

  return (
    <header className="fixed z-10 w-full space-y-2 bg-primary px-8 py-2 text-secondary">
      <nav>
        <ul className="flex items-center justify-between">
          <div className="flex gap-1">
            <li className="rounded px-2 py-1 hover:bg-secondary hover:text-primary">
              <Link to="/">Home</Link>
            </li>
            <li className="rounded px-2 py-1 hover:bg-secondary hover:text-primary">
              <Link to="/purchases">Purchases</Link>
            </li>
          </div>
          <div className="group flex flex-col gap-1">
            <li className="relative rounded px-2 py-1 group-hover:bg-secondary group-hover:text-primary">
              <Link to="/checkout">
                <ShoppingCart className="w-7 text-inherit" />
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-secondary p-1 text-primary group-hover:bg-primary group-hover:text-secondary">
                  {cartIds.length}
                </span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
      <div className="flex justify-end">
        <Link className="text-xs hover:underline" to="/funds">
          Balance:{" "}
          {formatPrice({
            price: balance.funds,
            currency: balance.currency,
          })}
        </Link>
      </div>
    </header>
  );
};
