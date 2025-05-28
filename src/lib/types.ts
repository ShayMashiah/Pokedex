export const Variant = {
  Default: "default",
  PokeInfo: "poke-info",
  MyPokemons: "my-pokemons",
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export interface PokemonRow {
  id: number;
  name: { english: string };
  image: { thumbnail: string };
  description: string;
  base: { HP: number; Attack: number };
};

export interface PokemonModal {
  id: number;
  name: string;
  image: string;
  description?: string;
  height?: string;
  weight?: string;
  category?: string;
  abilities?: string;
}