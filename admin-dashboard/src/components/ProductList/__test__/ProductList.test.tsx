import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import ProductList from '..';

const mockProps = {
  query: 'abc',
  page: 1,
  limit: 10,
};

describe.skip('ProductList component', () => {
  it('should match snapshot for ProductList', () => {
    const { container } = render(<ProductList {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
