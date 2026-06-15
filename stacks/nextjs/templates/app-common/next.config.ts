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
  }
};

const sentryOptions = {
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true
};

export default withSentryConfig(nextConfig, sentryOptions);
