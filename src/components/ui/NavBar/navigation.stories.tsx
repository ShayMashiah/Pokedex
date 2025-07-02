import type { Meta, StoryObj } from "@storybook/react";
import PokemonNavbar from "./PokemonNavbar";

const meta: Meta<typeof PokemonNavbar> = {
  title: "UI/Navbar",
  component: PokemonNavbar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PokemonNavbar>;

export const Default: Story = {
  render: () => (
    <PokemonNavbar
      activeItem="all"
      onChange={(value) => {
        console.log("Selected:", value);
      }}
    />
  ),
};
