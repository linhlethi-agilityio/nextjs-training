import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import ProductPaginationUI from '..';

const mockReplace = jest.fn();
const mockPathname = 'localhost:3000';
const mockURLSearchParams = {
  page: '1',
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(() => mockPathname),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
  useSearchParams: jest.fn(() => new URLSearchParams(mockURLSearchParams)),
}));

const mockProps = {
  totalPage: 8,
};

describe('ProductPaginationUI component', () => {
  it('should match snapshot for ProductPaginationUI', () => {
    const { container } = render(<ProductPaginationUI {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
