import { useQuery } from "@tanstack/react-query";
import { getUserPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";
import { userId } from "../constants";
import { Tab } from "../types";

export const useUserPokemons = (
  page: number = 1,
  limit: number = 30,
  search?: string,
  sortBy: string = "id",
  order: "asc" | "desc" = "asc",
  activeTab?: Tab
) => {
    console.log(activeTab)

  return useQuery({
    queryKey: ["userPokemons", userId, limit, search, sortBy, order, page, activeTab],
    queryFn: async () => {
      const data = await getUserPokemons({
        userId,
        page,
        limit,
        search,
        sortBy,
        order,
      });
      return {
        ...data,
        data: data.data.map(mapBackendToFrontend),
      };
    },
    staleTime: 1000 * 60 * 10,
  });
};

