import { useQuery } from "@tanstack/react-query";
import { getPokemon as getPokemonService } from "@/services/pokemon";

export const useSearchPokemon = ({ searchText, pages }) => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["pokemon", searchText, pages],
    queryFn: () => getPokemonService({ name: searchText, pages }),
    enabled: searchText.length > 0,
  });

  return { isPending, isError, data };
};
