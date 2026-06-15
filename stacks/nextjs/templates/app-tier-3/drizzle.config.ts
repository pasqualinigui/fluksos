import { defineConfig } from 'drizzle-kit';

// We explicitly read from process.env instead of importing our typed 'env.ts' here.
// This prevents drizzle-kit from crashing if non-database environment variables 
// (like BETTER_AUTH_SECRET or NODE_ENV) are missing during isolated CLI commands.
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    '[drizzle] DATABASE_URL is not set. Copy .env.example to .env and configure your database connection.'
  );
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl
  },
  verbose: true,
  strict: true
});
