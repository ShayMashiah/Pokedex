export const Variant = {
  Default: "default",
  PokeInfo: "poke-info",
  MyPokemons: "my-pokemons",
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];
