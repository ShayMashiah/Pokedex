import { Dialog, DialogTrigger, DialogContent } from "./dialog";
import { Variant } from "../../../lib/constants";
import { Button } from "../Button/button";
import type { Meta, StoryObj } from "@storybook/react";
import { usePokemonById } from "../../../lib/hooks/usePokemonById";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

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
  const { data: pokemon } = usePokemonById(1);

  if (!pokemon) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="xlg">Show Pokemon Info</Button>
      </DialogTrigger>
      <DialogContent variant={Variant.PokeInfo} pokemon={pokemon} />
    </Dialog>
  );
};

export const PokemonInfo: Story = {
  render: () => <PokemonInfoComponent />,
};
