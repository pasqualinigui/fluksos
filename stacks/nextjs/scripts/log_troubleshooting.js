#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [, , errorDescription, solution] = process.argv;

if (!errorDescription || !solution) {
  console.error(
    '\x1b[31m[ERROR]\x1b[0m Usage: node log_troubleshooting.js "Error Description" "Applied Solution"'
  );
  process.exit(1);
}

const targetFile = path.resolve(__dirname, '../TROUBLESHOOTING.md');
const date = new Date().toISOString().split('T')[0];

const logEntry = `
### [${date}] Incident Log
- **Error/Context**: ${errorDescription}
- **Solution/Workaround**: ${solution}
- **Status**: Pending Human Curation
---
`;

fs.appendFileSync(targetFile, logEntry, 'utf8');
console.log(
  '\x1b[32m[SUCCESS]\x1b[0m Learning successfully recorded in TROUBLESHOOTING.md for future curation.'
);
