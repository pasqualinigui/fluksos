import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { generateReport, logReport } from './lib/report-generator.js'

export function validateConfig(rootDir) {
  const violations = []

  // 1. Check package.json for forbidden dependencies & scripts
  const pkgPath = join(rootDir, 'package.json')
  let isNextJs = false
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      if (deps.next) isNextJs = true

      const forbidden = [
        { name: 'axios', reason: 'Use native fetch or fetcher.ts instead.' },
        { name: 'jest', reason: 'Use vitest instead.' },
        { name: 'next-auth', reason: 'Use Better Auth instead.' },
        { name: 'zod', reason: 'Use valibot instead.' },
        {
          name: 'jsonwebtoken',
          reason: 'JWT stateless is banned for sessions. Better Auth handles this natively.',
        },
        {
          name: 'jose',
          reason: 'JWT stateless is banned for sessions. Better Auth handles this natively.',
        },
        {
          name: 'date-fns',
          reason: 'Use native TypeScript 6 Temporal API instead of heavy date libraries.',
        },
        { name: 'dayjs', reason: 'Use native TypeScript 6 Temporal API instead.' },
        { name: 'moment', reason: 'Moment is massively outdated and forbidden. Use Temporal API.' },
        {
          name: 'husky',
          reason: 'Husky is forbidden. Use Lefthook for native parallel performance.',
        },
        { name: 'lint-staged', reason: 'Lint-staged is legacy. Use Lefthook stage_fixed.' },
      ]

      for (const bad of forbidden) {
        if (deps[bad.name]) {
          violations.push({
            file: 'package.json',
            rule: `forbidden-dependency-${bad.name}`,
            message: `Dependency '${bad.name}' is forbidden. ${bad.reason}`,
            severity: 'FATAL',
          })
        }
      }

      // Check Scripts
      const scripts = pkg.scripts || {}
      if (!scripts.check || !scripts['lint:fix']) {
        violations.push({
          file: 'package.json',
          rule: 'missing-biome-scripts',
          message: 'Biome scripts "check" and "lint:fix" are mandatory.',
          severity: 'FATAL',
        })
      }

      if (
        scripts['db:push']?.includes('drizzle-kit push') &&
        !scripts['db:push'].includes('node')
      ) {
        violations.push({
          file: 'package.json',
          rule: 'insecure-db-push',
          message:
            'db:push must be wrapped in a script that checks NODE_ENV !== "production". Raw drizzle-kit push is dangerous.',
          severity: 'FATAL',
        })
      }
    } catch (err) {
      violations.push({
        file: 'package.json',
        rule: 'malformed-json',
        message: `Failed to parse package.json. Ensure it is valid JSON. Error: ${err.message}`,
        severity: 'FATAL',
      })
    }
  }

  // 2. Check tsconfig.json for strictness (no 'any')
  const tsConfigPath = join(rootDir, 'tsconfig.json')
  if (existsSync(tsConfigPath)) {
    try {
      const tsContent = readFileSync(tsConfigPath, 'utf8')
      if (tsContent.includes('"noImplicitAny": false')) {
        violations.push({
          file: 'tsconfig.json',
          rule: 'forbidden-implicit-any',
          message:
            'TypeScript "noImplicitAny" MUST be true. We do not allow "any" in this factory.',
          severity: 'FATAL',
        })
      }
    } catch {
      // ignore
    }
  }

  // 3. Check next.config.ts for typedRoutes (Only if Next.js)
  if (isNextJs) {
    const nextConfigPath = join(rootDir, 'next.config.ts')
    if (existsSync(nextConfigPath)) {
      try {
        const nextContent = readFileSync(nextConfigPath, 'utf8')
        if (!/typedRoutes:\s*true/.test(nextContent)) {
          violations.push({
            file: 'next.config.ts',
            rule: 'missing-typed-routes',
            message: 'Next.js config MUST have experimental: { typedRoutes: true }.',
            severity: 'FATAL',
          })
        }
      } catch {
        // ignore
      }
    }
  }

  // 4. Check components.json for Tailwind v4 Shadcn config
  const componentsJsonPath = join(rootDir, 'components.json')
  if (existsSync(componentsJsonPath)) {
    try {
      const comp = JSON.parse(readFileSync(componentsJsonPath, 'utf8'))
      if (comp.tailwind && comp.tailwind.config !== '') {
        violations.push({
          file: 'components.json',
          rule: 'invalid-shadcn-tailwind-v4',
          message:
            'Shadcn components.json MUST have "config": "" under tailwind for Tailwind v4 compatibility.',
          severity: 'FATAL',
        })
      }
    } catch (err) {
      violations.push({
        file: 'components.json',
        rule: 'malformed-json',
        message: `Failed to parse components.json. Ensure it is valid JSON. Error: ${err.message}`,
        severity: 'FATAL',
      })
    }
  }

  // 5. Check .env for leaked secrets and sync with .env.example
  const envPath = join(rootDir, '.env')
  const envExamplePath = join(rootDir, '.env.example')

  if (existsSync(envPath)) {
    try {
      const envContent = readFileSync(envPath, 'utf8')
      const lines = envContent.split('\n')
      const envKeys = new Set()

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue

        const key = trimmed.split('=')[0]
        if (key) envKeys.add(key)

        if (
          trimmed.startsWith('NEXT_PUBLIC_') &&
          (trimmed.includes('SECRET') || trimmed.includes('PRIVATE'))
        ) {
          violations.push({
            file: '.env',
            rule: 'leaked-secret-env',
            message: `FATAL: You are exposing a secret to the browser: ${key}. Never prefix secrets with NEXT_PUBLIC_.`,
            severity: 'FATAL',
          })
        }
      }

      // Sync with .env.example
      if (existsSync(envExamplePath)) {
        const exampleContent = readFileSync(envExamplePath, 'utf8')
        const exampleLines = exampleContent.split('\n')

        for (const line of exampleLines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith('#')) continue

          const key = trimmed.split('=')[0]
          if (key && !envKeys.has(key)) {
            violations.push({
              file: '.env',
              rule: 'missing-env-var',
              message: `FATAL: Missing required environment variable from .env.example: ${key}`,
              severity: 'FATAL',
            })
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // Check lockfiles
  if (existsSync(join(rootDir, 'package-lock.json'))) {
    violations.push({
      file: 'package-lock.json',
      rule: 'forbidden-package-manager-npm',
      message: 'NPM is forbidden. Delete package-lock.json and use pnpm install.',
      severity: 'FATAL',
    })
  }

  if (existsSync(join(rootDir, 'yarn.lock'))) {
    violations.push({
      file: 'yarn.lock',
      rule: 'forbidden-package-manager-yarn',
      message: 'Yarn is forbidden. Delete yarn.lock and use pnpm install.',
      severity: 'FATAL',
    })
  }

  return violations
}

if (process.argv[1]?.endsWith('validate-config.js')) {
  const targetDir = process.argv[2] || process.cwd()
  const violations = validateConfig(targetDir)
  logReport(generateReport(violations))
  if (violations.length > 0) process.exit(1)
}
