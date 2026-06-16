import path from 'path';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  typedRoutes: true,
  turbopack: {
    root: path.join(__dirname, '../../')
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development'
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' }
        ],
      },
    ];
  }
};

const sentryOptions = {
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true
};

export default withSentryConfig(nextConfig, sentryOptions);
