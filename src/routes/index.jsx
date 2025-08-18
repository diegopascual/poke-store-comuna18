import { useState, Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PokemonList, SearchBar } from "@/components";
import { useInfiniteScroll } from "@/hooks";
import { useSearchPokemon } from "@/hooks";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Pokemon Search
  const [searchText, setSearchText] = useState("");
  const isInSearchMode = searchText.length > 0;
  const { isPending, isError, data, error, ref } = useInfiniteScroll({
    isInSearchMode,
  });

  const {
    isPending: isSearching,
    isError: pokemonNotFound,
    data: pokemon,
  } = useSearchPokemon({ searchText, pages: data?.pages.length });

  return (
    <>
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
    </>
  );
}
