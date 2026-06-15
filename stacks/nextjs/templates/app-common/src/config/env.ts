import * as v from 'valibot';

const EnvSchema = v.object({
  DATABASE_URL: v.pipe(v.string(), v.url()),
  BETTER_AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),
  NEXT_PUBLIC_APP_URL: v.pipe(v.string(), v.url()),
  NODE_ENV: v.picklist(['development', 'test', 'production'])
});

const parsed = v.safeParse(EnvSchema, process.env);

if (!parsed.success) {
  console.error('Variáveis de ambiente inválidas', v.flatten(parsed.issues));
  process.exit(1);
}

export const env = parsed.output;
