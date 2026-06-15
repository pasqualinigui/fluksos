import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { registerOTel } = await import('@vercel/otel');

    registerOTel({
      serviceName: process.env.OTEL_SERVICE_NAME ?? 'nextjs-app'
    });

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
