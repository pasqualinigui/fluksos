import * as v from "valibot";

const EnvSchema = v.object({
	NEXT_PUBLIC_APP_URL: v.pipe(v.string(), v.url()),
	NODE_ENV: v.picklist(["development", "test", "production"]),
	DATABASE_URL: v.pipe(v.string(), v.url()),
	BETTER_AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),
	UPSTASH_REDIS_REST_URL: v.optional(v.pipe(v.string(), v.url())),
	UPSTASH_REDIS_REST_TOKEN: v.optional(v.string()),
	OTEL_SERVICE_NAME: v.optional(v.string()),
	OTEL_EXPORTER_OTLP_ENDPOINT: v.optional(v.pipe(v.string(), v.url())),
	PYROSCOPE_ENABLED: v.optional(v.picklist(["true", "false"])),
	PYROSCOPE_SERVER_ADDRESS: v.optional(v.pipe(v.string(), v.url())),
	NEXT_PUBLIC_FARO_COLLECTOR_URL: v.optional(v.pipe(v.string(), v.url())),
});

const parsed = v.safeParse(EnvSchema, process.env);

if (!parsed.success) {
	console.error("Invalid environment variables", v.flatten(parsed.issues));
	process.exit(1);
}

export const env = parsed.output;
