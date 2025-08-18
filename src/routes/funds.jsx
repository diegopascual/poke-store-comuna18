import { useContext, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RANGE_PRICES } from "@/constants/balance";
import { BalanceContext } from "@/contexts";
import { getRandomPrice, formatPrice } from "@/utils/helpers";

export const Route = createFileRoute("/funds")({
  component: RouteComponent,
});

function RouteComponent() {
  const { balance, addFunds } = useContext(BalanceContext);
  const [funds, setFunds] = useState(0);

  const handleClick = () => {
    const newFunds = Math.floor(
      getRandomPrice(RANGE_PRICES.MIN, RANGE_PRICES.MAX),
    );

    addFunds(newFunds);
    setFunds(newFunds);
  };

  return (
    <>
      <h2 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Add Funds
      </h2>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Button onClick={handleClick}>Add funds</Button>
        {funds > 0 && (
          <>
            <p>
              <span className="font-bold">Funds added: </span>
              {formatPrice({
                price: funds,
                currency: balance.currency,
              })}
            </p>
            <p>
              <span className="font-bold">Previous funds: </span>
              {formatPrice({
                price: balance.funds - funds,
                currency: balance.currency,
              })}
            </p>
          </>
        )}
      </div>
    </>
  );
}
