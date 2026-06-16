import * as v from "valibot";

const EnvSchema = v.object({
	DATABASE_URL: v.pipe(v.string(), v.url()),
	BETTER_AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),
	NEXT_PUBLIC_APP_URL: v.pipe(v.string(), v.url()),
	NODE_ENV: v.picklist(["development", "test", "production"]),
	UPSTASH_REDIS_REST_URL: v.optional(v.pipe(v.string(), v.url())),
	UPSTASH_REDIS_REST_TOKEN: v.optional(v.string()),
});

const parsed = v.safeParse(EnvSchema, process.env);

if (!parsed.success) {
	console.error("Invalid environment variables", v.flatten(parsed.issues));
	process.exit(1);
}

export const env = parsed.output;
