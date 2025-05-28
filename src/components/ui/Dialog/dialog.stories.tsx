import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { Variant } from "../../../lib/types";
import { Button } from "../Button/button";
import PokemonData from "../../../data/pokemon_.json";
import type { PokemonModal } from "../../../../src/lib/types";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const samplePokemon: PokemonModal = {
  id: PokemonData[0].id,
  name: PokemonData[0].name.english,
  image: PokemonData[0].image.thumbnail,
  description: PokemonData[0].description,
  height: PokemonData[0].profile.height,
  weight: PokemonData[0].profile.weight,
  category: PokemonData[0].species,
  abilities: PokemonData[0].profile.ability
  .map((a) => Array.isArray(a) && a.length >= 1 ? a[0] : "")
  .filter(Boolean)
  .join(", ")
};

const pokemons: PokemonModal[] = [
  {
    id: PokemonData[0].id,
    name: PokemonData[0].name.english,
    image: PokemonData[0].image.thumbnail,
  },
  {
    id: PokemonData[1].id,
    name: PokemonData[1].name.english,
    image: PokemonData[1].image.thumbnail,
  },
  {
    id: PokemonData[2].id,
    name: PokemonData[2].name.english,
    image: PokemonData[2].image.thumbnail,
  },
  {
    id: PokemonData[3].id,
    name: PokemonData[3].name.english,
    image: PokemonData[3].image.thumbnail,
  },
  {
    id: PokemonData[4].id,
    name: PokemonData[4].name.english,
    image: PokemonData[4].image.thumbnail,
  },
];

export const PokemonInfo: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="xlg">Show Pokemon Info</Button>
      </DialogTrigger>
      <DialogContent variant={Variant.PokeInfo} pokemon={samplePokemon} />
    </Dialog>
  ),
};

export const MyPokemons: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="xlg">Start battle</Button>
      </DialogTrigger>
      <DialogContent
        variant={Variant.MyPokemons}
        pokemons={pokemons}
        onSelectPokemon={(id) => alert("Selected Pokémon ID: " + id)}
      />
    </Dialog>
  ),
};
