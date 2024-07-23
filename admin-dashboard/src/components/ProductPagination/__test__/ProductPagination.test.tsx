import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import ProductPagination from '..';

// Api
import * as api from '@/api';

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

const props = {
  limit: 10,
};

describe('ProductPagination component', () => {
  it('should match snapshot for ProductPagination', async () => {
    jest.spyOn(api, 'getTotalOrders').mockResolvedValue({
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
        {
          createdAt: '2024-07-23T00:33:46.006Z',
          idOrder: '529-297',
          product: 'aa',
          customer: 'Darrin Williamson',
          status: 'Pending',
          deadline: '2024-08-01',
          price: 32432,
          id: '2',
          customerId: '11',
          productImage:
            'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4041392.jpg&fm=jpg',
        },
      ],
    });

    const ProductPaginationRender = await ProductPagination({ ...props });

    const { container } = render(ProductPaginationRender);

    expect(container).toMatchSnapshot();
  });
});
