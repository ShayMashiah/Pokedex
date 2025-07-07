import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { Variant } from "../../../lib/constants";
import { Button } from "../Button/button";
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockPokemon } from "../../../lib/mockData";

const queryClient = new QueryClient();

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const PokemonInfoComponent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="xlg">Show Pokemon Info</Button>
      </DialogTrigger>
      <DialogContent variant={Variant.PokeInfo} pokemon={mockPokemon} />
    </Dialog>
  );
};

export const PokemonInfo: Story = {
  render: () => <PokemonInfoComponent />,
};
