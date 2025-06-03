import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    value: 50,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const LowProgress: Story = {
  args: {
    value: 20,
  },
};

export const MediumProgress: Story = {
  args: {
    value: 50,
  },
};

export const HighProgress: Story = {
  args: {
    value: 80,
  },
};
