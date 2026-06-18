#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const [, , actionName, targetDir] = process.argv

if (!actionName || !targetDir) {
  console.error(
    '\x1b[31m[ERROR]\x1b[0m Usage: node generate_action.js <actionName> <target-directory>',
  )
  process.exit(1)
}

const fileName = `${actionName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, '')}.action.ts`
const absoluteTargetDir = path.resolve(targetDir)
const filePath = path.join(absoluteTargetDir, fileName)

const content = `"use server";
import { actionClient } from "@/lib/safe-action";
import * as v from "valibot";

// 1. Define the Input Schema with Valibot
const ${actionName}Schema = v.object({
  id: v.string(),
  // Add more fields here
});

// 2. Create the Safe Server Action
export const ${actionName}Action = actionClient
  .schema(${actionName}Schema)
  .action(async ({ parsedInput: { id } }) => {
    // [WARNING] GOLDEN RULE: Strict server logic goes here
    // Ex: const data = await db.query.users.findFirst({ where: eq(users.id, id) });
    
    return { success: true, message: \`Action executed successfully for ID: \${id}\` };
  });
`

if (!fs.existsSync(absoluteTargetDir)) {
  fs.mkdirSync(absoluteTargetDir, { recursive: true })
}

fs.writeFileSync(filePath, content)
console.log(
  `\x1b[32m[SUCCESS]\x1b[0m Server Action '${actionName}Action' generated successfully at: ${filePath}`,
)
