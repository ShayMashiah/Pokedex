import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';

export const Variant = {
  Default: "default",
  PokeInfo: "poke-info",
  MyPokemons: "my-pokemons",
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export interface CustomDialogContentProps
  extends ComponentProps<typeof DialogPrimitive.Content> {
  variant?: Variant;
  pokemon?: { id: number };
  pokemons?: PokemonModal[];
  onSelectPokemon?: (pokemonId: number) => void;
  onStartBattle?: () => void;
}


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
  category?: string[];
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

export const SortOption = {
  default: "Sort By",
  AZ :"A-Z",
  ZA : "Z-A",
  PowerHighLow : "Power H-L",
  PowerLowHigh : "Power L-H",
  HPHighLow : "HP H-L",
  HPLowHigh : "HP L-H",
} as const;

export type SortOption = (typeof SortOption)[keyof typeof SortOption];