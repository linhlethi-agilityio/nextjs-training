import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import ProductActions from '..';

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

const mockAddOrderAction = jest.fn();

const mockProps = {
  addOrderAction: mockAddOrderAction,
};

describe('ProductActions component', () => {
  it('should match snapshot for ProductActions', () => {
    const { container } = render(<ProductActions {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
