#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const [, , schemaName] = process.argv

if (!schemaName) {
  console.error('\x1b[31m[ERROR]\x1b[0m Usage: node generate_schema.js <SchemaName>')
  process.exit(1)
}

// Convert "Users" -> "users", "OrderItems" -> "order_items"
const tableName = schemaName.replace(/[A-Z]/g, (letter, index) =>
  index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`,
)
const fileName = `${tableName}.ts`

// Always place schemas in src/db/schema/
const absoluteTargetDir = path.resolve(process.cwd(), 'src', 'db', 'schema')
const filePath = path.join(absoluteTargetDir, fileName)

const content = `import { pgTable, uuid, varchar, timestamp, text, daterange } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// 🐘 PostgreSQL 18 Senior 2026 Standards 
export const ${tableName} = pgTable("${tableName}", {
  // [RULE] Use uuidv7() for perfect B-Tree locality on high insertion tables
  id: uuid("id").primaryKey().default(sql\`uuid_generate_v7()\`),
  
  // Example scalar
  name: varchar("name", { length: 255 }).notNull(),

  // [RULE] Operational Temporal Rules (PG18)
  // Used in conjunction with \`EXCLUDE USING gist (valid_period WITH &&)\` for WITHOUT OVERLAPS
  validPeriod: daterange("valid_period"),

  // [RULE] VIRTUAL Generated Columns
  searchVector: text("search_vector").generatedAlwaysAs((): any => sql\`to_tsvector('english', name)\`),

  // Audit columns
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Type definitions
export type ${schemaName} = typeof ${tableName}.$inferSelect;
export type New${schemaName} = typeof ${tableName}.$inferInsert;
`

if (!fs.existsSync(absoluteTargetDir)) {
  fs.mkdirSync(absoluteTargetDir, { recursive: true })
}

if (fs.existsSync(filePath)) {
  console.error(`\x1b[31m[ERROR]\x1b[0m Schema file already exists at: ${filePath}`)
  process.exit(1)
}

fs.writeFileSync(filePath, content)
console.log(
  `\x1b[32m[SUCCESS]\x1b[0m 🐘 PG18 Schema '${schemaName}' generated successfully at: ${filePath}`,
)
