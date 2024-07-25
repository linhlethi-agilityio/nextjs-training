import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/login', '/register'],
      disallow: ['/', '/product', '/customers'],
    },
    sitemap: 'https://nextjs-training-9355.vercel.app/sitemap.xml',
  };
}
