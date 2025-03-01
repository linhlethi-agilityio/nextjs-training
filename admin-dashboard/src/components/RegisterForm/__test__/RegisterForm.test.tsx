import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import RegisterForm from '..';

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

describe('RegisterForm component', () => {
  it('should match snapshot for RegisterForm', () => {
    const { container } = render(<RegisterForm onSubmit={mockOnSubmit} />);

    expect(container).toMatchSnapshot();
  });
});
