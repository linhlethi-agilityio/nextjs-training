import type { Meta, StoryObj } from '@storybook/react';

// Icons
import { FileTextFillIcon } from '@/icons';

// Components
import { SideBarItem } from '@/components';

const meta: Meta<typeof SideBarItem> = {
  component: SideBarItem,
};

export default meta;
type Story = StoryObj<typeof SideBarItem>;

export const Default: Story = {
  args: {
    isFocused: false,
    icon: FileTextFillIcon,
    label: 'Product',
    path: '/',
  },
};

export const Focused: Story = {
  args: {
    isFocused: true,
    icon: FileTextFillIcon,
    label: 'Product',
    path: '/',
  },
};
