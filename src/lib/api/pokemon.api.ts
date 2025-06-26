import axios from "axios";
import { BASE_URL } from "../constants";
import type { GetAllPokemonsResponse, GetAllPokemonsParams } from "../types";
import type { BackendPokemon } from "../types";

export const getAllPokemons = async (
  params: GetAllPokemonsParams
): Promise<GetAllPokemonsResponse> => {
  const res = await axios.get<GetAllPokemonsResponse>(`${BASE_URL}/pokemons`, {
    params,
  });
  return res.data;
};

export const getUserPokemons = async (
  params: GetAllPokemonsParams & { userId: number }
): Promise<GetAllPokemonsResponse> => {
  const { userId, ...queryParams } = params;
  const res = await axios.get<GetAllPokemonsResponse>(
    `${BASE_URL}/userpokemons/${userId}`,
    {
      params: queryParams,
    }
  );
  return res.data;
};

export const getPokemonById = async (id?: number): Promise<BackendPokemon> => {
  const res = await axios.get<BackendPokemon>(`${BASE_URL}/pokemons/${id}`);
  return res.data;
};

export const newPokemonToMyPokemons = async (userId: number, pokemonId: number) => {
  const res = await axios.post(`${BASE_URL}/userpokemons`, {
    userId,
    pokemonId,
  });
  return res.data;
};

