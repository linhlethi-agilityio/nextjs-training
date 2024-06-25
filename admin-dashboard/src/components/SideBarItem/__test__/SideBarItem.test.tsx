import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Icons
import { FileTextFillIcon } from '@/icons';

// Components
import { SideBarItem } from '@/components';

const mockOnClick = jest.fn();

const mockProps = {
  icon: <FileTextFillIcon />,
  onClick: mockOnClick,
  label: 'Product',
};

describe('SideBarItem component', () => {
  test('should match snapshot for SideBarItem', () => {
    const { container } = render(<SideBarItem {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  test('should match snapshot for SideBarItem', () => {
    const { container } = render(<SideBarItem {...mockProps} isFocused />);

    expect(container).toMatchSnapshot();
  });

  test('triggers onClick event', () => {
    const { getByTestId } = render(<SideBarItem {...mockProps} />);

    const sidebarItem = getByTestId('sidebar-item-Product');
    fireEvent.click(sidebarItem);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
