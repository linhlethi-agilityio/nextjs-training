import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Api
import * as api from '@/api';

// Components
import TableCustomers from '..';

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
  limit: 10,
  removeCustomerAction: jest.fn(),
};

describe('TableCustomers component', () => {
  it('should match snapshot for TableCustomers', async () => {
    jest.spyOn(api, 'getCustomers').mockResolvedValue({
      data: [
        {
          createdAt: '2024-07-21T00:07:42.462Z',
          name: 'Connie Smitham',
          email: 'Ansley_Jast7@hotmail.com',
          phoneNumber: '566-231-4136',
          dateOfBirth: '1979-11-21T13:46:01.346Z',
          shippingAddress: 'East',
          id: '1',
        },
      ],
    });

    const TableCustomersRender = await TableCustomers({
      ...mockProps,
    });

    const { container } = render(TableCustomersRender);

    expect(container).toMatchSnapshot();
  });
});
