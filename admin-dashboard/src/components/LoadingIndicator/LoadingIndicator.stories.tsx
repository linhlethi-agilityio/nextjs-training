import type { Meta, StoryObj } from '@storybook/react';

// Components
import LoadingIndicator from '.';

const meta: Meta<typeof LoadingIndicator> = {
  component: LoadingIndicator,
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {};
