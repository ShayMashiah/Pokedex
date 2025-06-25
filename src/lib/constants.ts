import { SortOption } from './types';

export const BASE_URL = "http://localhost:3000/api/v1";

export const userId = 113;

export const level = 50;

export const power = 60;

export const missChance = 0.05;

export const randomFactor = Math.random() * (1.3 - 0.7) + 0.7;

export const baseMissChance = 0.05; 

export const maxAttempts = 3;

export const pageSizeOptions = [10, 20, 30];

export const SORT_OPTIONS = [
  { label: 'Alphabetical A-Z', value: SortOption.AZ },
  { label: 'Alphabetical Z-A', value: SortOption.ZA },
  { label: 'Power (High to low)', value: SortOption.PowerHighLow },
  { label: 'Power (Low to high)', value: SortOption.PowerLowHigh },
  { label: 'HP (High to low)', value: SortOption.HPHighLow },
  { label: 'HP (Low to high)', value: SortOption.HPLowHigh },
];


export interface TurnMessageParams {
  playerTurn: boolean;
  isGameOver: boolean;
  enemyHp: number;
  rivalHp: number;
  myHp: number;
  selectedHp: number;
  triedToCatch: boolean;
  isCaught: boolean;
  rivalName: string;
  playerName: string;
  currentName: string;
}

interface TurnMessage {
  label: string;
  condition: (params: TurnMessageParams) => boolean;
  getMessage: (params: TurnMessageParams) => string;
}


export const TURN_MESSAGES: TurnMessage[] = [
  {
    label: "Enemy starts the fight",
    condition: ({ playerTurn , isGameOver, enemyHp, rivalHp, myHp, selectedHp }) =>
      !playerTurn &&
      !isGameOver &&
      enemyHp === rivalHp &&
      myHp === selectedHp,
    getMessage: ({ rivalName }) => `${rivalName} starts the fight!`,
  },
  {
    label: "Player starts the fight",
    condition: ({ playerTurn, isGameOver, enemyHp, rivalHp, myHp, selectedHp }) =>
      playerTurn &&
      !isGameOver &&
      enemyHp === rivalHp &&
      myHp === selectedHp,
    getMessage: ({ playerName }) => `${playerName} starts the fight!`,
  },
  {
    label: "Caught Pokémon",
    condition: ({ isCaught }) => isCaught,
    getMessage: ({ rivalName }) => `You caught ${rivalName}!`,
  },
  {
    label: "Can't catch yet",
    condition: ({ triedToCatch, isCaught, enemyHp, rivalHp, myHp, playerTurn }) =>
      triedToCatch &&
      !isCaught &&
      enemyHp > Math.floor(rivalHp * 0.33) &&
      myHp > 0 &&
      playerTurn,
    getMessage: ({ rivalName }) => `You can’t catch ${rivalName} yet.`,
  },
  {
    label: "Enemy fainted",
    condition: ({ enemyHp }) => enemyHp === 0,
    getMessage: ({ rivalName }) => `Critical hit! ${rivalName} fainted!`,
  },
  {
    label: "Player fainted",
    condition: ({ myHp }) => myHp === 0,
    getMessage: ({ playerName }) => `Critical hit! ${playerName} fainted!`,
  },
  {
    label: "Default attack",
    condition: () => true, 
    getMessage: ({ currentName }) => `${currentName} attacks!`,
  },
];

export const Variant = {
  Default: "default",
  PokeInfo: "poke-info",
  MyPokemons: "my-pokemons",
  SwitchPokemon: "switch-pokemon"
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export const buttonsVariant = {
  Attack: "attack",
  Catch: "catch",
} as const;
export type buttonsVariant = (typeof buttonsVariant)[keyof typeof buttonsVariant];

export const MY_POKEMONS_INIT = [1, 4,6, 25,101,133]
