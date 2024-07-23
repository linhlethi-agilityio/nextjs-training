import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import LoginForm from '..';

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

const mockOnSubmit = jest.fn();

describe('LoginForm component', () => {
  it('should match snapshot for LoginForm', () => {
    const { container } = render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(container).toMatchSnapshot();
  });
});
