import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '@/config/env';
import { db } from '@/db';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.NEXT_PUBLIC_APP_URL,
  emailAndPassword: { enabled: true }
});
