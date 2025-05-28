import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: [ "sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
    size: "sm",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
    size: "sm",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-start flex-wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    variant: "primary",
  },
};
