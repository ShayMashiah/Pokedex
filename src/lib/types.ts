import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
import { Variant } from '@/lib/constants';
import  { buttonsVariant } from '@/lib/constants';

export type GetAllPokemonsResponse = {
  data: BackendPokemon[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type GetAllPokemonsParams = {
  limit?: number;
  page?: number;
  sortBy?: string | "id";
  order?: 'asc' | 'desc';
  search?: string;
};


export interface CustomDialogContentProps
  extends ComponentProps<typeof DialogPrimitive.Content> {
  variant?: Variant;
  pokemon?: { id: number };
  pokemons?: PokemonModal[];
  onSwitchPokemon?: (pokemon: PokemonModal) => void;
  disabledPokemonId?: number;
  hideCloseButton?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  activeTab?: Tab;
}

export interface BattleBarProps  {
  name: string;
  speed: number;
  currentHP: number;
  maxHP: number;
  className?: string;
  isTurn?: boolean;
  isFainted?: boolean; 
};


export interface FightButtonProps  {
  type: buttonsVariant;
  className?: string;
  targetHp?: number;
  attackerAttack?: number;
  defenderDefense?: number;
  onAttack?: (damage: number) => void;
  onCatchSuccess?: () => void;
  disabled?: boolean; 
  onCatchFail?: () => void;
  rivalHp?: number;

};



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
  attack?: number;
  defense?: number;
  description?: string;
  height?: string;
  weight?: string;
  category?: string[];
  abilities?: string;
}

export interface PokemonNavbarProps {
  activeItem: Tab;
  onChange: (value: Tab) => void;
  page?: number ;
  limit?: number;
  sortBy?: string | "id";
  order?: 'asc' | 'desc';
  search?: string;
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
  description: string;
  profile?: {
    height?: string;
    weight?: string;
    ability: string[][] | [[string, string]]; 
    gender?: string;
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires?: string;
  };
};

export type BackendPokemon = {
  id: number;
  nameEnglish: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  species: string;
  description: string;
  height?: string | null;
  weight?: string | null;
  gender?: string | null;
  ability1?: string | null;
  ability1Hidden?: boolean | null;
  ability2?: string | null;
  ability2Hidden?: boolean | null;
  sprite?: string | null;
  thumbnail?: string | null;
  hires?: string | null;
};


export interface BattleResultModalProps  {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  imageSrc?: string;
  primaryButtonLabel: string;
  onPrimaryAction: () => void;
  secondaryButtonLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
  caughtPokemon?: Pokemon; 
  onSwitchPokemon?: (pokemon: PokemonModal) => void;
  hasSwitched: boolean;
  currentPokemonId?: number;
  rivalHp?: number;
};

