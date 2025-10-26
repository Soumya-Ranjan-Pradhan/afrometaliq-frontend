import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/static/',
        '/private/',
        '/checkout/',
        '/orders/',
        '/profile/',
        '/wishlist/',
        '/cart/',
      ],
    },
    sitemap: 'https://afrometaliq.com/sitemap.xml',
    host: 'https://afrometaliq.com',
  }
}