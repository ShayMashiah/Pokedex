// src/components/ui/dropdown-menu.stories.tsx
// src/components/ui/dropdown-menu.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { useState } from "react";

const meta: Meta = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("Sort By");

    const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger isOpen={isOpen}>{selectedOption}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleSelect("Alphabetical A-Z")}>Alphabetical A-Z</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("Alphabetical Z-A")}>Alphabetical A-Z</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("High to low")}>Power (High to low)</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("Low to high")}>Power (Low to high)</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("High to low")}> HP (High to low)</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSelect("Low to high")}>HP (Low to high)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
