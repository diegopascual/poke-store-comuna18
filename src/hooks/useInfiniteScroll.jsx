import { useEffect } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList as getPokemonListService } from "@/services/pokemon";

export const useInfiniteScroll = ({ isInSearchMode }) => {
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
    if (!entry?.isIntersecting || isInSearchMode) {
      return;
    }

    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, isInSearchMode]);

  return { isPending, isError, data, error, ref };
};
