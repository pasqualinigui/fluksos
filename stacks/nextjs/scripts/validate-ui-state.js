import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { generateReport, logReport } from './lib/report-generator.js'

function walk(dir) {
  try {
    const entries = readdirSync(dir)
    return entries.flatMap((entry) => {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        if (fullPath.includes('node_modules') || fullPath.includes('.git')) return []
        return walk(fullPath)
      }
      return [fullPath]
    })
  } catch {
    return []
  }
}

export function validateUiState(rootDir) {
  const files = walk(rootDir)
  const violations = []

  for (const file of files) {
    const relPath = relative(rootDir, file).replace(/\\/g, '/')

    // Rule: Zustand stores cannot fetch API data directly
    if (relPath.startsWith('src/stores/') && (file.endsWith('.ts') || file.endsWith('.js'))) {
      const content = readFileSync(file, 'utf8')
      if (
        content.includes('fetch(') ||
        content.includes('import { fetcher }') ||
        content.includes('axios(')
      ) {
        violations.push({
          file: relPath,
          rule: 'no-api-in-store',
          message:
            'Zustand stores in src/stores/ MUST NOT fetch data. They are only for ephemeral UI state.',
          severity: 'FATAL',
        })
      }
    }
  }

  return violations
}

if (process.argv[1]?.endsWith('validate-ui-state.js')) {
  const targetDir = process.argv[2] || process.cwd()
  const violations = validateUiState(targetDir)
  logReport(generateReport(violations))
  if (violations.length > 0) process.exit(1)
}
