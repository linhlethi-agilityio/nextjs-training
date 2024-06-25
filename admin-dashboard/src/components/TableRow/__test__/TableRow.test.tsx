import { render } from '@testing-library/react';
import { Table, Tbody, Td } from '@chakra-ui/react';

// Components
import { TableRow } from '..';

describe('TableRow', () => {
  it('should match snapshot for TableRow', () => {
    const handleClickRow = jest.fn();

    const { container } = render(
      <Table>
        <Tbody>
          <TableRow handleClickRow={handleClickRow}>
            <Td>inches</Td>
          </TableRow>
        </Tbody>
      </Table>,
    );

    expect(container).toMatchSnapshot();
  });
});
