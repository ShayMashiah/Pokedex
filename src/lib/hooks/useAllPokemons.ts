import { useQuery } from "@tanstack/react-query";
import { getAllPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";

export const useAllPokemons = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["allPokemons", page, limit, search],
    queryFn: async () => {
      const res = await getAllPokemons({ page, limit, search });
      return {
        data: res.data.map(mapBackendToFrontend),
        totalCount: res.totalCount,
        totalPages: res.totalPages,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
