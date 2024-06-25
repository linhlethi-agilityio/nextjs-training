import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Dropdown } from '.';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  {
    value: 'ascending',
    label: 'Ascending',
  },
  {
    value: 'descending',
    label: 'Descending',
  },
];

export const Default: Story = {
  args: {
    options: options,
    placeholder: 'Action',
    color: 'brand.500',
    fontWeight: 'semibold',
  },
};
