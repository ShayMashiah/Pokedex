import axios from "axios";
import { BASE_URL } from "../constants";
import type { GetAllPokemonsResponse } from "../types";

export const getAllPokemons = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<GetAllPokemonsResponse> => {
  const res = await axios.get<GetAllPokemonsResponse>(`${BASE_URL}/pokemons`, {
    params: { page, limit, search },
  });
  return res.data;
};


export const getUserPokemons = async ({
  userId,
  page = 1,
  limit = 10,
  search = "",
}: {
  userId: number;
  page?: number;
  limit?: number;
  search?: string;
}): Promise<GetAllPokemonsResponse> => {
  const res = await axios.get<GetAllPokemonsResponse>(
    `${BASE_URL}/userpokemons/${userId}`,
    {
      params: { page, limit, search },
    }
  );
  return res.data;
};

