/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  staticPageGenerationTimeout: 1000,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [480, 1920],
    imageSizes: [40, 128],
  },
};

export default nextConfig;
