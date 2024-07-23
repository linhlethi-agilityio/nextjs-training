import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { TableCustomersUI } from '..';

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
  limit: 10,
  pages: 1,
  role: 'admin',
  customers: [
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
  removeCustomerAction: jest.fn(),
};

describe('TableCustomersUI component', () => {
  it('should match snapshot for TableCustomersUI', () => {
    const { container } = render(<TableCustomersUI {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
