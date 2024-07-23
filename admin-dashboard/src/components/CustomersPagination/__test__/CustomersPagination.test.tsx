import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import CustomersPagination from '..';

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

describe('CustomersPagination component', () => {
  it('should match snapshot for CustomersPagination', async () => {
    jest.spyOn(api, 'getTotalCustomers').mockResolvedValue({
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
        {
          createdAt: '2024-07-21T05:43:59.000Z',
          name: 'Terence Murphy',
          email: 'Johnson_Mayer@hotmail.com',
          phoneNumber: '263-583-0766',
          dateOfBirth: '1966-05-03T08:57:27.517Z',
          shippingAddress: 'South',
          id: '2',
        },
      ],
    });

    const CustomersPaginationRender = await CustomersPagination({ ...props });

    const { container } = render(CustomersPaginationRender);

    expect(container).toMatchSnapshot();
  });
});
