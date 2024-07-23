import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Api
import * as api from '@/api';

// Constants
import { SORT_BY, SORT_ORDER } from '@/constants';

// Components
import TableOrder from '..';

jest.mock('@/api');
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

const mockProps = {
  query: 'name',
  page: 1,
  sortBy: SORT_BY.DEADLINE,
  sortOrder: SORT_ORDER.ASC,
  limit: 10,
  removeOrderAction: jest.fn(),
  editOrderAction: jest.fn(),
  getOrderDetail: jest.fn(),
};

describe('TableCustomers component', () => {
  it('should match snapshot for TableCustomers', async () => {
    jest.spyOn(api, 'getOrders').mockResolvedValue({
      data: [
        {
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
        },
      ],
    });

    const TableOrderRender = await TableOrder({
      ...mockProps,
    });

    const { container } = render(TableOrderRender);

    expect(container).toMatchSnapshot();
  });
});
