import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newPokemonToMyPokemons } from "../api/pokemon.api";
import { userId } from "../constants";

export const useNewPokemonToMyPokemons = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pokemonId: number) => newPokemonToMyPokemons(userId, pokemonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPokemons", userId] });
    },
  });
};
