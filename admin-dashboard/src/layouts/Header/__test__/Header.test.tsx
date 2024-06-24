import { render } from '@testing-library/react';

import Header from '..';

describe('BrandLogo component', () => {
  it('should match snapshot for BrandLogo', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
