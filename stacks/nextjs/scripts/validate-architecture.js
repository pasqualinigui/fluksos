import { existsSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { analyzeFile } from './lib/ast-parser.js'
import { generateReport, logReport } from './lib/report-generator.js'

function walk(dir, seen = new Set()) {
  try {
    // Prevent infinite symlink loops
    const realDir = realpathSync(dir)
    if (seen.has(realDir)) return []
    seen.add(realDir)

    const entries = readdirSync(dir)
    return entries.flatMap((entry) => {
      const fullPath = join(dir, entry)
      try {
        const stat = statSync(fullPath)
        if (stat.isDirectory()) {
          if (
            [
              'node_modules',
              '.git',
              '.next',
              '.turbo',
              '.agent',
              '.agents',
              'dist',
              'build',
              'out',
            ].includes(entry)
          )
            return []
          return walk(fullPath, seen)
        }
        return [fullPath]
      } catch (err) {
        // Handle EACCES or ENOENT silently on individual files
        if (err.code === 'EACCES' || err.code === 'ENOENT') return []
        throw err
      }
    })
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'ENOENT') return []
    return []
  }
}

function findAppRoots(dir, roots = [], seen = new Set()) {
  try {
    const realDir = realpathSync(dir)
    if (seen.has(realDir)) return roots
    seen.add(realDir)

    const entries = readdirSync(dir)
    if (
      entries.includes('next.config.ts') ||
      entries.includes('next.config.js') ||
      entries.includes('next.config.mjs')
    ) {
      roots.push(dir)
    }
    for (const entry of entries) {
      if (
        [
          'node_modules',
          '.git',
          '.next',
          '.turbo',
          '.agent',
          '.agents',
          'dist',
          'build',
          'out',
        ].includes(entry)
      )
        continue
      const fullPath = join(dir, entry)
      try {
        const stat = statSync(fullPath)
        if (stat.isDirectory()) {
          findAppRoots(fullPath, roots, seen)
        }
      } catch (err) {
        if (err.code === 'EACCES' || err.code === 'ENOENT') continue
        throw err
      }
    }
    return roots
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'ENOENT') return roots
    return roots
  }
}

export function validateArchitecture(rootDir) {
  // Gracefully skip if it's explicitly NOT a Next.js project
  const pkgPath = join(rootDir, 'package.json')
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      if (!deps.next) {
        return [] // Not a Next.js project, safe to skip Next.js architectural rules
      }
    } catch {
      // ignore
    }
  }

  const files = walk(rootDir)
  const violations = []
  const appRoots = findAppRoots(rootDir)
  if (appRoots.length === 0) appRoots.push(rootDir)

  // 1. Core Tooling Checks
  if (existsSync(join(rootDir, '.eslintrc.json')) || existsSync(join(rootDir, '.eslintrc.js'))) {
    violations.push({
      file: '.eslintrc',
      rule: 'no-eslint',
      message: 'ESLint is banned. The standard is Biome.',
      severity: 'FATAL',
    })
  }

  if (!existsSync(join(rootDir, 'biome.json'))) {
    violations.push({
      file: 'biome.json',
      rule: 'missing-biome',
      message: 'biome.json is required for strict A.N.T. formatting.',
      severity: 'FATAL',
    })
  }

  // 2. Next.js App Router Strictness
  for (const appRoot of appRoots) {
    const relRoot = relative(rootDir, appRoot).replace(/\\/g, '/') || '.'

    if (
      existsSync(join(appRoot, 'src', 'middleware.ts')) ||
      existsSync(join(appRoot, 'middleware.ts'))
    ) {
      violations.push({
        file: join(relRoot, 'middleware.ts').replace(/\\/g, '/'),
        rule: 'deprecated-middleware',
        message:
          'FATAL: Next.js 16.2+ no longer uses middleware.ts. You MUST use proxy.ts for edge routing.',
        severity: 'FATAL',
      })
    }

    if (existsSync(join(appRoot, 'src', 'pages'))) {
      violations.push({
        file: join(relRoot, 'src/pages/').replace(/\\/g, '/'),
        rule: 'banned-pages-router',
        message: 'Pages Router is strictly forbidden. Use App Router (src/app/) exclusively.',
        severity: 'FATAL',
      })
    }

    // 3. AEO / SEO Eco-system
    if (
      !existsSync(join(appRoot, 'src', 'app', 'llms.txt')) &&
      !existsSync(join(appRoot, 'src', 'app', 'llms.txt', 'route.ts'))
    ) {
      violations.push({
        file: join(relRoot, 'src/app/llms.txt').replace(/\\/g, '/'),
        rule: 'missing-llms-txt',
        message: 'llms.txt is mandatory for AEO. You MUST expose your product to LLMs.',
        severity: 'FATAL',
      })
    }

    if (
      !existsSync(join(appRoot, 'src', 'app', 'llms-full.txt')) &&
      !existsSync(join(appRoot, 'src', 'app', 'llms-full.txt', 'route.ts'))
    ) {
      violations.push({
        file: join(relRoot, 'src/app/llms-full.txt').replace(/\\/g, '/'),
        rule: 'missing-llms-full-txt',
        message: 'llms-full.txt bundle is mandatory for GitHub Copilot / Anthropic API ingestion.',
        severity: 'FATAL',
      })
    }

    if (existsSync(join(appRoot, 'public', 'robots.txt'))) {
      violations.push({
        file: join(relRoot, 'public/robots.txt').replace(/\\/g, '/'),
        rule: 'static-robots-txt',
        message:
          'Static robots.txt is forbidden. Use dynamic src/app/robots.ts for environment awareness.',
        severity: 'FATAL',
      })
    }

    if (existsSync(join(appRoot, 'public', 'sitemap.xml'))) {
      violations.push({
        file: join(relRoot, 'public/sitemap.xml').replace(/\\/g, '/'),
        rule: 'static-sitemap-xml',
        message: 'Static sitemap.xml is forbidden. Use dynamic src/app/sitemap.ts.',
        severity: 'FATAL',
      })
    }

    // 4. Tailwind v4 Legacy Ban
    if (
      existsSync(join(appRoot, 'tailwind.config.ts')) ||
      existsSync(join(appRoot, 'tailwind.config.js'))
    ) {
      violations.push({
        file: join(relRoot, 'tailwind.config.*').replace(/\\/g, '/'),
        rule: 'legacy-tailwind-config',
        message: 'tailwind.config is banned in Tailwind v4. Configuration MUST be in globals.css.',
        severity: 'FATAL',
      })
    }

    if (
      existsSync(join(appRoot, 'postcss.config.js')) ||
      existsSync(join(appRoot, 'postcss.config.cjs'))
    ) {
      violations.push({
        file: join(relRoot, 'postcss.config.js').replace(/\\/g, '/'),
        rule: 'legacy-postcss-config',
        message: 'postcss.config MUST be an ES Module (.mjs) with @tailwindcss/postcss plugin.',
        severity: 'FATAL',
      })
    }
  }

  // 5. AST Analysis via ast-parser.js
  for (const file of files) {
    const relPath = relative(rootDir, file).replace(/\\/g, '/')
    if (
      file.endsWith('.ts') ||
      file.endsWith('.tsx') ||
      file.endsWith('.js') ||
      file.endsWith('.css')
    ) {
      const astViolations = analyzeFile(file, relPath)
      violations.push(...astViolations)
    }

    // E-03: Open Graph Image check for marketing pages
    if (relPath.includes('(marketing)') && relPath.endsWith('page.tsx')) {
      const dir = join(file, '..')
      if (
        !existsSync(join(dir, 'opengraph-image.png')) &&
        !existsSync(join(dir, 'opengraph-image.jpg')) &&
        !existsSync(join(dir, 'opengraph-image.tsx'))
      ) {
        violations.push({
          file: relPath,
          rule: 'missing-opengraph-image',
          message:
            'Public indexable pages MUST have an opengraph-image.(png|jpg|tsx) in the same directory.',
          severity: 'ERROR',
        })
      }
    }
  }

  return violations
}

if (process.argv[1]?.endsWith('validate-architecture.js')) {
  const targetDir = process.argv[2] || process.cwd()
  const violations = validateArchitecture(targetDir)
  logReport(generateReport(violations))
  if (violations.length > 0) {
    process.exit(1)
  }
}
