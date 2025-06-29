import { useQuery } from "@tanstack/react-query";
import { getAllPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";

export const useAllPokemons = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  sortBy: string = "id",
  order: "asc" | "desc" = "asc"
) => {  return useQuery({
    queryKey: ["allPokemons", page, limit, search, sortBy, order],
    queryFn: async () => {
      const res = await getAllPokemons({ page, limit, search, sortBy, order });
      return {
        data: res.data.map(mapBackendToFrontend),
        totalCount: res.totalCount,
        totalPages: res.totalPages,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
