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

    const { logs } = await import('@opentelemetry/api-logs');
    const { LoggerProvider, BatchLogRecordProcessor } = await import('@opentelemetry/sdk-logs');
    const { OTLPLogExporter } = await import('@opentelemetry/exporter-logs-otlp-http');

    const loggerProvider = new LoggerProvider();
    loggerProvider.addLogRecordProcessor(
      new BatchLogRecordProcessor(
        new OTLPLogExporter({
          url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/logs'
        })
      )
    );
    logs.setGlobalLoggerProvider(loggerProvider);

    if (process.env.PYROSCOPE_ENABLED === 'true') {
      const Pyroscope = await import('@grafana/pyroscope-nodejs');
      Pyroscope.init({
        serverAddress: process.env.PYROSCOPE_SERVER_ADDRESS ?? 'http://localhost:4040',
        appName: process.env.OTEL_SERVICE_NAME ?? 'nextjs-app'
      });
      Pyroscope.start();
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
