import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components

import { SkeletonTable } from '@/components';

describe('SkeletonTable component', () => {
  it('should match snapshot for SkeletonTable', () => {
    const { container } = render(<SkeletonTable />);

    expect(container).toMatchSnapshot();
  });
});
