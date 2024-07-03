import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components

import { PaginationSkeleton } from '@/components';

describe('PaginationSkeleton component', () => {
  it('should match snapshot for PaginationSkeleton', () => {
    const { container } = render(<PaginationSkeleton />);

    expect(container).toMatchSnapshot();
  });
});
