import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Search",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const DropdownInput: Story = {
  args: {
    variant: "dropdown-input",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    disabled: true,
  },
};
