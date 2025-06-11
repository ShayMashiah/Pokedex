import  pokemonData  from "@/data/pokemon_.json"; 
import type { PokemonModal, Pokemon } from "@/lib/types";

export function mapMyPokemonsByIds(myPokemonIds: number[]) {
  if (!myPokemonIds || myPokemonIds.length === 0) return [];

  return myPokemonIds
    .map((id) => pokemonData.find((poke) => poke.id === id))
    .filter((p): p is typeof pokemonData[0] => p !== undefined)
    .map((p) => ({
      id: p.id,
      name: p.name.english,
      image: p.image?.thumbnail ?? "",
      hires: p.image?.hires ?? "",
      speed: p.base.Speed,
      hp: p.base.HP,
      attack: p.base.Attack,
      defense: p.base.Defense,
      description: p.description,
      height: p.profile?.height ?? "Unknown",
      weight: p.profile?.weight ?? "Unknown",
      category: p.type ?? "Unknown",
      abilities:
        p.profile?.ability
          ?.map((a: string[]) => a[0].split(",")[0].trim())
          .join(", ") ?? "Unknown",
    }));
}



export function transformToPokemonModal(pokemon: Pokemon): PokemonModal {
    return {
      id: pokemon.id,
      name: pokemon.name?.english ?? "Unknown", 
      image: pokemon.image?.thumbnail ?? "",
      hires: pokemon.image?.hires,
      speed: pokemon.base.Speed,
      hp: pokemon.base.HP,
      attack: pokemon.base.Attack,
      defense: pokemon.base.Defense,
      description: pokemon.description ?? "",
      height: pokemon.profile?.height ?? "",
      weight: pokemon.profile?.weight ?? "",
      category: pokemon.type ?? [],
      abilities:
        pokemon.profile?.ability
          ?.map((ability: any) => ability)
          .join(", ") ?? "",
    };
  }