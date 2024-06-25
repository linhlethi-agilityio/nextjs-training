import { render } from '@testing-library/react';
import { Table, Tbody, Tr } from '@chakra-ui/react';

// Components
import TableCell from '..';

describe('TableCell', () => {
  it('should match snapshot for TableCell', () => {
    const { container } = render(
      <Table>
        <Tbody>
          <Tr>
            <TableCell>inches</TableCell>
          </Tr>
        </Tbody>
      </Table>,
    );

    expect(container).toMatchSnapshot();
  });
});
