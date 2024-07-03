import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import OrderHeader from '..';

const mockReplace = jest.fn();
const mockPathname = 'localhost:3000';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(() => mockPathname),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
}));

const mockProps = {
  limit: 10,
};

describe('OrderHeader component', () => {
  it('should match snapshot for OrderHeader', () => {
    const { container } = render(<OrderHeader {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
