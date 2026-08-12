'use client';

import { useEffect } from 'react';
import { initializeFaro, getWebInstrumentations } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';
import { OtlpHttpTransport } from '@grafana/faro-transport-otlp-http';
import { env } from "@/config/env";

export function FaroInit() {
  useEffect(() => {
    const collectorUrl = env.NEXT_PUBLIC_FARO_COLLECTOR_URL;

    if (collectorUrl && typeof window !== 'undefined') {
      initializeFaro({
        url: collectorUrl,
        app: {
          name: "fluksos-app",
          version: '1.0.0',
        },
        transports: [
          new OtlpHttpTransport({
            url: `${collectorUrl}/traces`,
          }),
        ],
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation({
            instrumentationOptions: {
              propagateTraceHeaderCorsUrls: [/.*/],
            },
          }),
        ],
      });
    }
  }, []);

  return null;
}
