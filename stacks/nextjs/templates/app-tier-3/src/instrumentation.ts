import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { PgInstrumentation } from "@opentelemetry/instrumentation-pg";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const sdk = new NodeSDK({
			resource: new Resource({
				[SEMRESATTRS_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || "fluksos-app",
			}),
			traceExporter: new OTLPTraceExporter({
				url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318/v1/traces",
			}),
			instrumentations: [
				new HttpInstrumentation(),
				new PgInstrumentation({
					requireParentSpan: true,
				}),
			],
		});

		sdk.start();

		// Graceful shutdown
		process.on("SIGTERM", () => {
			sdk
				.shutdown()
				.then(() => console.log("Tracing terminated"))
				.catch((error: unknown) => console.log("Error terminating tracing", error))
				.finally(() => process.exit(0));
		});
	}
}
