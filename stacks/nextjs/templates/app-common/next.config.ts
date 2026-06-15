import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true,
    instrumentationHook: true
  },
  reactCompiler: true,
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
  hideSourceMaps: true,
  disableLogger: true
};

export default withSentryConfig(nextConfig, sentryOptions);
