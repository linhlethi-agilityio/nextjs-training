import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Icons
import { FileTextFillIcon } from '@/icons';

// Components
import { SideBarItem } from '@/components';

const mockProps = {
  icon: FileTextFillIcon,
  path: '/',
  label: 'Product',
};

describe('SideBarItem component', () => {
  it('should match snapshot for SideBarItem', () => {
    const { container } = render(<SideBarItem {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for SideBarItem', () => {
    const { container } = render(<SideBarItem {...mockProps} isFocused />);

    expect(container).toMatchSnapshot();
  });
});
