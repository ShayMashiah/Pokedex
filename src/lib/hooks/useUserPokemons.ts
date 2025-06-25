import { useQuery } from "@tanstack/react-query";
import { getUserPokemons } from "../api/pokemon.api";
import { mapBackendToFrontend } from "../utils/mapMyPokemons";

export const useUserPokemons = () => {
  return useQuery({
    queryKey: ["userPokemons"],
    queryFn: async () => {
      const data = await getUserPokemons();
      return data.map(mapBackendToFrontend); 
    },  
    staleTime: 1000 * 60 * 10,
});
};
