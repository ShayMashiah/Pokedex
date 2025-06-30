import type { PokemonModal, Pokemon, BackendPokemon } from "@/lib/types";

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

  export function mapBackendToFrontend(p: BackendPokemon): Pokemon {
  return {
    id: p.id,
    name: {
      english: p.nameEnglish,
    },
    type: p.type,
    base: {
      HP: p.hp,
      Attack: p.attack,
      Defense: p.defense,
      "Sp. Attack": p.spAttack,
      "Sp. Defense": p.spDefense,
      Speed: p.speed,
    },
    species: p.species,
    description: p.description,
    profile: {
      height: p.height ?? undefined,
      weight: p.weight ?? undefined,
      gender: p.gender ?? undefined,
      ability: [
        [p.ability1 ?? "", p.ability1Hidden ? "true" : "false"],
        [p.ability2 ?? "", p.ability2Hidden ? "true" : "false"],
      ],
    },
    image: {
      sprite: p.sprite ?? "",
      thumbnail: p.thumbnail ?? "",
      hires: p.hires ?? undefined,
    },
  };
}
