import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import Pagination from '..';

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

const mockOnClick = jest.fn;

const mockProps = {
  totalPage: 4,
  currentPage: 2,
  onClickPage: mockOnClick,
};

describe('Pagination component', () => {
  it('should match snapshot for Pagination', () => {
    const { container } = render(<Pagination {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
