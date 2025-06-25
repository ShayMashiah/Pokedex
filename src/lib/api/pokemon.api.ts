import axios from "axios";
import type { BackendPokemon } from "../types";
import { userId } from "../constants";
import { BASE_URL } from "../constants";

export const getAllPokemons = async (): Promise<BackendPokemon[]> => {
  const res = await axios.get<BackendPokemon[]>(`${BASE_URL}/pokemons`);
  return res.data;
};

export const getUserPokemons = async (): Promise<BackendPokemon[]> => {
  const res = await axios.get<BackendPokemon[]>(`${BASE_URL}/userpokemons/${userId}`);
  return res.data;
};
