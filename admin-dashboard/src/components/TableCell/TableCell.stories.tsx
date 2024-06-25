import type { StoryObj, Meta } from '@storybook/react';
import { Table, Tbody, Tr } from '@chakra-ui/react';

// Components
import TableCell from '.';

const meta: Meta<typeof TableCell> = {
  component: TableCell,
};

export default meta;
type Story = StoryObj<typeof TableCell>;

export const Default: Story = {
  render: () => (
    <Table>
      <Tbody>
        <Tr>
          <TableCell>cell</TableCell>
        </Tr>
      </Tbody>
    </Table>
  ),
};
