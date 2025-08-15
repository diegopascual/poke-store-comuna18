import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPokemonList as getPokemonListService } from "@/services/pokemon";
import { PokemonList } from "@/components";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage] = useState(1);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => getPokemonListService({ page }),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1>Pokemon Store</h1>
      <PokemonList pokemonList={data} />
    </>
  );
}
