import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList as getPokemonListService } from "@/services/pokemon";
import { PokemonList } from "@/components";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "100px",
  });

  const { isPending, isError, data, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam }) => getPokemonListService({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className="py-6">
      <h1 className="mb-6 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Pokemon Store
      </h1>
      <PokemonList pokemonList={data} />
      <div id="visor" ref={ref}></div>
    </main>
  );
}
