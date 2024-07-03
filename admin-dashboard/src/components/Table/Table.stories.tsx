import type { Meta } from '@storybook/react';

// Components
import { Table, TableColumnType } from '.';

interface Customer {
  idOrder: string;
  customer: string;
  product: string;
  status: string;
}

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

const columnsTable: TableColumnType<Partial<Customer>>[] = [
  {
    header: 'Id Order',
    accessor: 'idOrder',
  },
  {
    header: 'Product',
    accessor: 'product',
  },
  {
    header: 'Customer',
    accessor: 'customer',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

const data = [
  {
    idOrder: '345-645',
    customer: 'Iphone 11 256 GB TAM',
    product: 'Surabaya',
    status: 'Rejected',
  },
  {
    idOrder: '465-674',
    customer: 'Gaming Chair Dragon War',
    product: 'Surabaya',
    status: 'Complete',
  },
];

export const Default = () => <Table columns={columnsTable} data={data}></Table>;
