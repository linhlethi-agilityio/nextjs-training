import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import SideBar from '..';

describe('SideBar component', () => {
  it('should match snapshot for SideBar', () => {
    const { container } = render(<SideBar />);

    expect(container).toMatchSnapshot();
  });
});
