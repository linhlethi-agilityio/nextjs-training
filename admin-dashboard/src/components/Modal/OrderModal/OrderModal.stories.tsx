import type { Meta, StoryObj } from '@storybook/react';

// Components
import { OrderModal } from '.';

const meta: Meta<typeof OrderModal> = {
  component: OrderModal,
};

export default meta;
type Story = StoryObj<typeof OrderModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => null,
    handleSubmitForm: () => null,
  },
};
