import type { Meta, StoryObj } from "@storybook/react";
import  PokemonNavbar  from "./PokemonNavbar";

const meta: Meta<typeof PokemonNavbar> = {
  title: "UI/PokemonNavbar",
  component: PokemonNavbar,
  parameters: {
    layout: "fullscreen", 
  },
};

export default meta;

type Story = StoryObj<typeof PokemonNavbar>;

export const Default: Story = {
  render: () => <PokemonNavbar />,
};
