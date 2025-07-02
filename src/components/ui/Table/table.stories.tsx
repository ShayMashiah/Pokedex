import type { Meta, StoryObj } from "@storybook/react";
import PokemonTable from "./PokemonTable";
import { useAllPokemons } from "../../../lib/hooks/useAllPokemons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof PokemonTable> = {
  title: "UI/Table",
  component: PokemonTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PokemonTable>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <PokemonTableWithData />
      </QueryClientProvider>
    );
  },
};

const PokemonTableWithData = () => {
  const { data } = useAllPokemons(1, 10);

  if (!data) return null;


  console.log("data", data);


  return (
    <PokemonTable
      data={data.data}
      totalCount={data.totalCount}
      totalPages={data.totalPages}
      currentPage={1}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      itemsPerPage={10}
      activeTab="all"
    />
  );
};
