import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Pagination } from '@/components';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPage: 4,
    currentPage: 2,
    onClickPage: () => null,
  },
};
