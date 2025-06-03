// PokemonTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import PokemonTable from "./PokemonTable";
import pokemonData from "@/data/pokemon_.json";


const meta: Meta<typeof PokemonTable> = {
  title: "UI/Table",
  component: PokemonTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PokemonTable>;

export const Default: Story = {
  args: {
    data: pokemonData,
  },
};
