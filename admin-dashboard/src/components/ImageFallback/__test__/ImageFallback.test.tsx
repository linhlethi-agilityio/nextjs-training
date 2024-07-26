import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Constants
import { BLUR_DATA_URL } from '@/constants';

// Components
import ImageFallback from '..';

const mockProps = {
  src: '',
  alt: 'image',
  fallbackSrc: BLUR_DATA_URL,
};

describe('ImageFallback component', () => {
  it('should match snapshot for ImageFallback', () => {
    const { container } = render(<ImageFallback {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('switches to fallbackSrc on error', () => {
    const { getByAltText } = render(<ImageFallback {...mockProps} />);

    const image = getByAltText('image') as HTMLImageElement;
    image.onerror?.(new Event('error'));

    expect(image.src).toContain('http://localhost/');
  });

  it('switches to fallbackSrc when loading completes with broken image', () => {
    const { getByAltText } = render(<ImageFallback {...mockProps} />);

    const image = getByAltText('image') as HTMLImageElement;
    image.onload?.({ naturalWidth: 0 } as any); // Simulate broken image

    expect(image.src).toContain('http://localhost/');
  });
});
