import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import TableOrderUI from '..';

const mockRemoveOrderAction = jest.fn();
const mockEditOrderAction = jest.fn();

const mockProps = {
  orders: [
    {
      createdAt: '2024-06-27T07:22:57.429Z',
      idOrder: '523-475',
      product: 'Gorgeous Frozen Shoes',
      customer: 'Luz Nader',
      status: 'Pending',
      deadline: '2099-01-10T03:51:06.333Z',
      price: 929.0,
      id: '3',
    },
  ],
  removeOrderAction: mockRemoveOrderAction,
  editOrderAction: mockEditOrderAction,
};

describe('TableOrderUI component', () => {
  it('should match snapshot for TableOrderUI', () => {
    const { container } = render(<TableOrderUI {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
