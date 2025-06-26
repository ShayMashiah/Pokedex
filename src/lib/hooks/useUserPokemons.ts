import { useQuery } from "@tanstack/react-query";
import { getUserPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";
import { userId } from "../constants";

export const useUserPokemons = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["userPokemons", page, limit, search],
    queryFn: async () => {
      const data = await getUserPokemons({ userId, page, limit, search });
      return {
        ...data,
        data: data.data.map(mapBackendToFrontend),
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};
