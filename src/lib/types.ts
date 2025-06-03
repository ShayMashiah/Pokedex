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

export interface PokemonNavbarProps {
  activeItem: Tab;
  onChange: (value: Tab) => void;
}

export const Tab = {
  All : "all",
  User : "user",
} as const;

export type Tab = (typeof Tab)[keyof typeof Tab];

export const TAB_LABELS: Record<Tab, string> = {
  [Tab.All]: "All Pokemons",
  [Tab.User]: "My Pokemons",
};