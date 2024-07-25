'use client';

import Image, { ImageProps } from 'next/image';
import { memo, useState } from 'react';

interface ImageFallbackProps extends ImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
}

const ImageFallback = ({
  src,
  fallbackSrc,
  alt,
  ...rest
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      blurDataURL={fallbackSrc}
      placeholder="blur"
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      alt={alt}
      {...rest}
    />
  );
};

export default memo(ImageFallback);
