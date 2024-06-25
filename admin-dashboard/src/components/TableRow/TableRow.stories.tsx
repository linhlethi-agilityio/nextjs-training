import type { StoryObj, Meta } from '@storybook/react';
import { Table, Tbody, Td } from '@chakra-ui/react';

// Components
import { TableRow } from '.';

const meta: Meta<typeof TableRow> = {
  component: TableRow,
};

export default meta;
type Story = StoryObj<typeof TableRow>;

export const Default: Story = {
  render: () => (
    <Table>
      <Tbody>
        <TableRow>
          <Td>inches</Td>
        </TableRow>
      </Tbody>
    </Table>
  ),
};
