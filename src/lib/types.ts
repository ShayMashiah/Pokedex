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

}

export interface BattleBarProps  {
  name: string;
  speed: number;
  currentHP: number;
  maxHP: number;
  className?: string;

};


export interface FightButtonProps {
  type: "attack" | "catch";
  className?: string;
  targetHp?: number;
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
  hires?: string;
  speed?: number;
  hp?: number;
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
  Null : "null",
} as const;

export type Tab = (typeof Tab)[keyof typeof Tab];

export const TAB_LABELS: Record<Tab, string> = {
  [Tab.All]: "All Pokemons",
  [Tab.User]: "My Pokemons",
  [Tab.Null]: "No Pokemons",
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

export interface Pokemon  {
  id: number;
  name: {
    english: string;
    japanese?: string;
    chinese?: string;
    french?: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
  species?: string;
  description?: string;
  evolution?: {
    prev?: [string, string];
    next?: [string, string][];
  };
  profile?: {
    height?: string;
    weight?: string;
    egg?: string[];
    ability?: [[string, string]];
    gender: string;
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires?: string;
  };
};

