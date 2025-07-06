import type { Meta, StoryObj } from "@storybook/react";
import PokemonTable from "./PokemonTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockTableData } from "@/lib/mockData";

const queryClient = new QueryClient();

const meta: Meta<typeof PokemonTable> = {
  title: "UI/Table",
  component: PokemonTable,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PokemonTable>;


export const Default: Story = {
  render: () => (
    <PokemonTable
      data={mockTableData }
      totalCount={3}
      totalPages={1}
      currentPage={1}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      itemsPerPage={10}
      activeTab="all"
    />
  ),
};
