import { render } from '@testing-library/react';

// Components
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  test('should match snapshot for Table', () => {
    const { container } = render(<LoadingIndicator />);

    expect(container).toMatchSnapshot();
  });
});
