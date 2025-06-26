import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";
import type { Pokemon } from "../types";

export const usePokemonById = (id?: number, enabled = true) => {
  return useQuery<Pokemon>({
    queryKey: ["pokemonById", id],
    queryFn: async () => {
      const data = await getPokemonById(id);
      return mapBackendToFrontend(data);
    },
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 5, 
  });
};
