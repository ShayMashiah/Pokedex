import { useQuery } from "@tanstack/react-query";
import { getAllPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";

export const useAllPokemons = () => {
  return useQuery({
    queryKey: ["allPokemons"],
    queryFn: async () => {
      const data = await getAllPokemons();
      return data.data.map(mapBackendToFrontend);
    },
    staleTime: 1000 * 60 * 10,
  });
};
