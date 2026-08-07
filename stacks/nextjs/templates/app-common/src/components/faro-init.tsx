'use client';

import { useEffect } from 'react';
import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { OtlpHttpTransport } from '@grafana/faro-transport-otlp-http';

export function FaroInit() {
  useEffect(() => {
    const collectorUrl = process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL;

    if (collectorUrl && typeof window !== 'undefined') {
      initializeFaro({
        url: collectorUrl,
        app: {
          name: process.env.NEXT_PUBLIC_APP_NAME ?? 'nextjs-app',
          version: '1.0.0',
        },
        transports: [
          new OtlpHttpTransport({
            url: collectorUrl,
          }),
        ],
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
        ],
      });
    }
  }, []);

  return null;
}
