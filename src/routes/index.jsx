import { useState, useEffect, Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getPokemonList as getPokemonListService,
  getPokemon as getPokemonService,
} from "@/services/pokemon";
import { PokemonList, SearchBar } from "@/components";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Pokemon List
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

      // setPage(lastPageParam + 1);
      return lastPageParam + 1;
    },
  });

  // Pokemon Search
  const [searchText, setSearchText] = useState("");
  const isInSearchMode = searchText.length > 0;

  const {
    isPending: isSearching,
    isError: pokemonNotFound,
    data: pokemon,
  } = useQuery({
    queryKey: ["pokemon", searchText, data?.pages.length],
    queryFn: () =>
      getPokemonService({ name: searchText, pages: data?.pages.length }),
    enabled: isInSearchMode,
  });

  useEffect(() => {
    if (!entry?.isIntersecting || isInSearchMode) {
      return;
    }

    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, isInSearchMode]);

  return (
    <main className="mx-auto max-w-7xl p-8 pt-25 xl:px-0">
      <h1 className="mb-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Pokemon Store
      </h1>
      <SearchBar onSearch={setSearchText} />
      {isPending && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      {isSearching && isInSearchMode && <p>Searching pokemon...</p>}
      <section className="grid-cols-2 gap-6 space-y-6 md:m-0 md:grid md:space-y-0 xl:grid-cols-4">
        {pokemonNotFound && <p>No results</p>}
        {!isSearching > 0 && pokemon ? (
          <PokemonList pokemonList={[pokemon]} />
        ) : (
          data?.pages.map((page, index) => (
            <Fragment key={index}>
              <PokemonList pokemonList={page} />
            </Fragment>
          ))
        )}
      </section>
      {!isInSearchMode && <div id="visor" ref={ref}></div>}
    </main>
  );
}
