import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import SearchCustomers from '..';

const mockReplace = jest.fn();
const mockURLSearchParams = {
  page: '1',
  query: 'John',
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
  useSearchParams: jest.fn(() => new URLSearchParams(mockURLSearchParams)),
}));

describe('SearchCustomers component', () => {
  it('should match snapshot for SearchCustomers', () => {
    const { container } = render(<SearchCustomers />);

    expect(container).toMatchSnapshot();
  });

  it('sets search input value from URL search params', () => {
    const { getByPlaceholderText } = render(<SearchCustomers />);

    const input = getByPlaceholderText(
      'Search by customer name',
    ) as HTMLInputElement;

    expect(input.value).toBe('John');
  });
});
