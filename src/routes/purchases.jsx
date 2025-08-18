import { useContext } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PokemonList } from "@/components";
import { PurchasesContext } from "@/contexts";

export const Route = createFileRoute("/purchases")({
  component: RouteComponent,
});

function RouteComponent() {
  const { purchases } = useContext(PurchasesContext);

  return (
    <>
      <h2 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Your Pokemon
      </h2>
      <section className="grid-cols-2 gap-6 space-y-6 md:m-0 md:grid md:space-y-0 xl:grid-cols-4">
        <PokemonList pokemonList={purchases} />
      </section>
    </>
  );
}
