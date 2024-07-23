import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import SideBar from '..';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('next/dynamic', () => jest.fn());

const mockOnLogout = jest.fn();

describe('SideBar component', () => {
  it('should match snapshot for SideBar', () => {
    const { container } = render(<SideBar onLogout={mockOnLogout} />);

    expect(container).toMatchSnapshot();
  });
});
