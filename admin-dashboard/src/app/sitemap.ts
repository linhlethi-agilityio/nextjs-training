import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nextjs-training-9355.vercel.app/product',
      lastModified: new Date(),
    },
    {
      url: 'https://nextjs-training-9355.vercel.app/customers',
      lastModified: new Date(),
    },
    {
      url: 'https://nextjs-training-9355.vercel.app/login',
      lastModified: new Date(),
    },
    {
      url: 'https://nextjs-training-9355.vercel.app/register',
      lastModified: new Date(),
    },
  ];
}
