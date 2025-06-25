import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";

export const useSearchPokemon = (searchTerm: string, userId: number | undefined) => {
  return useQuery({
    queryKey: ["searchPokemon", searchTerm, userId],
    queryFn: async () => {
      if (!searchTerm) return [];
      const data = await searchPokemon(searchTerm, userId);
      return data.map(mapBackendToFrontend);
    },
    enabled: !!searchTerm, 
    staleTime: 1000 * 60 * 5, 
  });
};
