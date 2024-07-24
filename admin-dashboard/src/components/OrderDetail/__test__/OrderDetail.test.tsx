import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import OrderDetail from '..';

const mockReplace = jest.fn();
const mockURLSearchParams = {
  page: '1',
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
  useSearchParams: jest.fn(() => new URLSearchParams(mockURLSearchParams)),
}));

const mockEditOrderAction = jest.fn();

const mockProps = {
  createdAt: '2024-07-23T00:33:27.809Z',
  idOrder: '969-875',
  product: 'fdgf',
  customer: 'Angie McCullough',
  status: 'Rejected',
  deadline: '2024-07-31',
  price: 3244,
  id: '1',
  customerId: '11',
  productImage:
    'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg',
  editOrderAction: mockEditOrderAction,
};

describe('OrderDetail component', () => {
  it('should match snapshot for OrderDetail', () => {
    const { container } = render(<OrderDetail {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
