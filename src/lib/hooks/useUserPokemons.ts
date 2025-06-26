import { useQuery } from "@tanstack/react-query";
import { getUserPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";
import { userId } from "../constants";

export const useUserPokemons = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  sortBy: string = "id",
  order: "asc" | "desc" = "asc"
) => {
  return useQuery({
    queryKey: ["userPokemons",userId, page, limit, search, sortBy, order],
    queryFn: async () => {
      const data = await getUserPokemons({ userId, page, limit, search , sortBy, order});
      return {
        ...data,
        data: data.data.map(mapBackendToFrontend),
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
