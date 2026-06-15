import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'PerplexityBot',
        allow: '/'
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/'
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/'
      },
      {
        userAgent: 'GPTBot',
        disallow: '/'
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/'
      },
      {
        userAgent: 'CCBot',
        disallow: '/'
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/'
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: '/'
      },
      {
        userAgent: 'Bytespider',
        disallow: '/'
      },
      {
        userAgent: 'ImagesiftBot',
        disallow: '/'
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/admin/', '/_next/']
      }
    ],
    sitemap: 'https://dominio.com/sitemap.xml',
    host: 'https://dominio.com'
  };
}
