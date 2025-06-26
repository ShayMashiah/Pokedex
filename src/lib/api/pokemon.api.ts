import axios from "axios";
import { BASE_URL } from "../constants";
import type { GetAllPokemonsResponse, GetAllPokemonsParams } from "../types";

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
