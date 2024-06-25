import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import { CustomModal } from '.';

const meta: Meta<typeof CustomModal> = {
  component: CustomModal,
};

export default meta;
type Story = StoryObj<typeof CustomModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => null,
    title: 'Student Detail',
    children: (
      <Box>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quasi
        veritatis id aperiam delectus iste aliquid fugit sint ea ex? Aliquid
        totam blanditiis quae quia repellat eos unde consequuntur laborum!
      </Box>
    ),
  },
};
