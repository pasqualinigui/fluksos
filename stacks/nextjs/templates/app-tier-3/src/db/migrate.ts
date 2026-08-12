import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as schema from './index' // Note: Ensure your index.ts exports the schema

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const connectionString = process.env.DATABASE_URL
  console.log('⏳ Running migrations...')

  const migrationClient = postgres(connectionString, { max: 1 })
  const db = drizzle(migrationClient, { schema })

  try {
    await migrate(db, { migrationsFolder: 'drizzle' })
    console.log('✅ Migrations applied successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await migrationClient.end()
  }
}

runMigrate().catch((err) => {
  console.error('❌ Unexpected error during migration:', err)
  process.exit(1)
})
