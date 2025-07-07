import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    name: "Pikachu",
    speed: 55,
    currentHP: 50,
    maxHP: 100,
    isTurn: true,
    isFainted: false,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const LowProgress: Story = {
  args: {
    currentHP: 20,
  },
};

export const MediumProgress: Story = {
  args: {
    currentHP: 50,
  },
};

export const HighProgress: Story = {
  args: {
    currentHP: 80,
  },
};
