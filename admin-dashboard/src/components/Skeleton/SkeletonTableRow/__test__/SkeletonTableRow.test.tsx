import { render } from '@testing-library/react';
import { Table, Tbody } from '@chakra-ui/react';

// Components
import { TableColumnType, SkeletonTable } from '@/components';

interface User {
  name: string;
  email: string;
  phone: string;
}

const columnsTable: TableColumnType<User>[] = [
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Phone',
    accessor: 'phone',
  },
];

describe('TableRow', () => {
  it('should match snapshot for TableRow', () => {
    const { container } = render(
      <Table>
        <Tbody>
          <SkeletonTable columns={columnsTable} />
        </Tbody>
      </Table>,
    );

    expect(container).toMatchSnapshot();
  });
});
