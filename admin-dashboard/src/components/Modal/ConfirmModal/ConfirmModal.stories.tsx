import type { Meta, StoryObj } from '@storybook/react';

// Components
import ConfirmModal from '.';

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    description: 'Are you sure you would like to delete order',
    title: 'Delete Order',
    buttonLabel: 'Submit',
    onConfirm: () => null,
    onCancel: () => null,
  },
};
