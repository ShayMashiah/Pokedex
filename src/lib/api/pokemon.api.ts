import axios from "axios";
import type { BackendPokemon } from "../types";
import { userId } from "../constants";
import { BASE_URL } from "../constants";
import type { GetAllPokemonsResponse } from "../types";

export const getAllPokemons = async (): Promise<GetAllPokemonsResponse> => {
  const res = await axios.get<GetAllPokemonsResponse>(`${BASE_URL}/pokemons`);
  return res.data;
};

export const getUserPokemons = async (): Promise<BackendPokemon[]> => {
  const res = await axios.get<BackendPokemon[]>(`${BASE_URL}/userpokemons/${userId}`);
  return res.data;
};

export const searchPokemon = async (
  name: string,
  userId?: number
): Promise<BackendPokemon[]> => {
  try {
    const url = userId
      ? `${BASE_URL}/userpokemons/${userId}`
      : `${BASE_URL}/pokemons`;

    const res = await axios.get<BackendPokemon[]>(url, {
      params: {
        search: name,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return [];
  }
};

