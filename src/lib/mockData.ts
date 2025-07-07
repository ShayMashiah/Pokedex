import type { PokemonRow } from "../lib/types";

export const mockPokemon = {
  id: 1,
  name: "Bulbasaur",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  type: ["Grass", "Poison"],
  hp: 45,
  attack: 49,
  defense: 49,
  speed: 45,
  abilities: ["Overgrow", "Chlorophyll"],
  description:
    "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
};

export const mockTableData: PokemonRow[] = [
  {
    id: 1,
    name: { english: "Bulbasaur" },
    image: { thumbnail: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/001.png" },
    description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    base: { HP: 45, Attack: 49 },
  },
  {
    id: 4,
    name: { english: "Charmander" },
    image: { thumbnail: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/004.png" },
    description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
    base: { HP: 39, Attack: 52 },
  },
  {
    id: 7,
    name: { english: "Squirtle" },
    image: { thumbnail: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/thumbnails/007.png" },
    description: "Shoots water at prey while in the water. Withdraws into its shell when in danger.",
    base: { HP: 44, Attack: 48 },
  },
];
