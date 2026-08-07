export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { registerOTel } = await import('@vercel/otel');

    registerOTel({
      serviceName: process.env.OTEL_SERVICE_NAME ?? 'nextjs-app'
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
      const Pyroscope = await import('@pyroscope/nodejs');
      Pyroscope.init({
        serverAddress: process.env.PYROSCOPE_SERVER_ADDRESS ?? 'http://localhost:4040',
        appName: process.env.OTEL_SERVICE_NAME ?? 'nextjs-app'
      });
      Pyroscope.start();
    }
  }
}

export async function onRequestError(error: Error, request: Request, context: { routePath: string }) {
  const { logs } = await import('@opentelemetry/api-logs');
  const logger = logs.getLogger('nextjs');
  logger.emit({
    severityText: 'ERROR',
    body: error.message,
    attributes: {
      'error.stack': error.stack ?? '',
      'http.method': request.method,
      'http.url': request.url,
      'next.route': context.routePath,
    },
  });
}
