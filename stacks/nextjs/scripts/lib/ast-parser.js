import { readFileSync } from 'node:fs'

export function analyzeFile(filePath, relPath) {
  const violations = []
  try {
    const content = readFileSync(filePath, 'utf8')

    // 1. Server-Only Expansion (services/, actions/, db/, fetcher.ts)
    if (
      relPath.startsWith('src/services/') ||
      relPath.startsWith('src/actions/') ||
      relPath.startsWith('src/db/') ||
      relPath === 'src/lib/fetcher.ts' ||
      relPath === 'src/lib/fetcher.server.ts'
    ) {
      if (!/import\s+['"]server-only['"]/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'missing-server-only',
          message: 'This module MUST include import "server-only" at the top.',
          severity: 'FATAL',
        })
      }
    }

    // 2. Legacy Next.js Cache & React imports
    if (/import\s*\{\s*[^}]*unstable_cache/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'deprecated-unstable-cache',
        message: 'unstable_cache is banned in Next.js 16. Use the "use cache" directive.',
        severity: 'FATAL',
      })
    }

    if (/cache:\s*['"]force-cache['"]/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'deprecated-force-cache',
        message: 'fetch() with cache: "force-cache" is legacy Next.js 14. Use "use cache".',
        severity: 'FATAL',
      })
    }

    if (/\/\/\s*@ts-ignore/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'banned-ts-ignore',
        message: '// @ts-ignore is strictly forbidden. Fix the types.',
        severity: 'FATAL',
      })
    }

    // 2.5. React Context, Redux, and Axios Ban
    if (/import\s*\{[^}]*createContext[^}]*\}\s*from\s*['"]react['"]/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'banned-react-context',
        message: 'Global state MUST use Zustand. React Context API is strictly forbidden.',
        severity: 'FATAL',
      })
    }

    if (/from\s*['"]react-redux['"]|from\s*['"]@reduxjs\/toolkit['"]/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'banned-redux',
        message: 'Global state MUST use Zustand. Redux is strictly forbidden.',
        severity: 'FATAL',
      })
    }

    if (/md5/i.test(content) && /(?:crypto|hash)/i.test(content)) {
      violations.push({
        file: relPath,
        rule: 'banned-md5',
        message:
          'MD5 is structurally banned. PostgreSQL 18 and Senior codebases demand SCRAM-SHA-256 or secure hashing.',
        severity: 'FATAL',
      })
    }

    if (/import\s*\{\s*[^}]*db\s*\}/.test(content)) {
      if (
        !relPath.startsWith('src/db/') &&
        !relPath.startsWith('src/services/') &&
        !relPath.startsWith('src/actions/')
      ) {
        violations.push({
          file: relPath,
          rule: 'db-in-controller',
          message: 'Direct db access is banned outside of Repositories/Services/Actions.',
          severity: 'FATAL',
        })
      }
    }

    if (/uuidv4\(\)/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'legacy-uuid',
        message: 'uuidv4() used where uuidv7() is expected for internal PKs in PG18.',
        severity: 'ERROR',
      })
    }

    if (/import\s+.*?from\s*['"]axios['"]/.test(content)) {
      violations.push({
        file: relPath,
        rule: 'banned-axios',
        message: 'Axios is banned. Use the native fetcher.ts or Hono RPC.',
        severity: 'FATAL',
      })
    }

    // 3. Page.tsx Rules
    if (relPath.endsWith('page.tsx')) {
      if (/['"]use client['"]/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'use-client-in-page',
          message:
            'page.tsx MUST be a React Server Component. Push "use client" down to leaf components.',
          severity: 'FATAL',
        })
      }

      if (/export\s+async\s+function\s+(POST|PUT|DELETE|PATCH)/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'business-logic-in-page',
          message: 'Pages should not contain direct route handler mutations. Use Server Actions.',
          severity: 'ERROR',
        })
      }

      if (/import\s*\{\s*[^}]*db\s*\}/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'db-in-page',
          message: 'Do not import db directly in page.tsx. Use a service or action.',
          severity: 'FATAL',
        })
      }

      // Metadata rule for dynamic routes
      if (
        relPath.includes('[') &&
        relPath.includes(']') &&
        /export\s+const\s+metadata/.test(content)
      ) {
        violations.push({
          file: relPath,
          rule: 'static-metadata-in-dynamic-route',
          message:
            'Dynamic routes ([slug]) MUST use generateMetadata(), not static export const metadata.',
          severity: 'FATAL',
        })
      }
    }

    // 4. Client Components Rules (any file with 'use client')
    if (/['"]use client['"]/.test(content)) {
      if (/<script\s+type=['"]application\/ld\+json['"]/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'json-ld-in-client',
          message:
            'JSON-LD MUST be injected in Server Components, never in "use client" components (invisible to some LLM bots).',
          severity: 'FATAL',
        })
      }

      if (/import\s*\{\s*[^}]*db\s*\}/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'db-in-client-component',
          message: 'Never import db in a Client Component.',
          severity: 'FATAL',
        })
      }

      // Detect CSR Fetching in useEffect
      if (/useEffect\s*\([^)]*\)\s*=>\s*\{[^}]*(?:fetch\(|axios\()/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'banned-csr-fetch',
          message:
            'Client-side data fetching MUST use TanStack Query or Hono RPC. Raw fetch inside useEffect is forbidden.',
          severity: 'FATAL',
        })
      }
    }

    // 5. Zustand Isolation
    if (relPath.startsWith('src/stores/')) {
      if (/fetch\(|useQuery|axios|import\s*\{\s*[^}]*db\s*\}|fetcher/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'remote-data-in-zustand',
          message:
            'Zustand is strictly for UI state. Remote data (fetch, useQuery, db) MUST be handled by TanStack Query or Server Components.',
          severity: 'FATAL',
        })
      }
    }

    // 6. Better Auth strictness
    if (relPath === 'src/lib/auth.ts' || relPath === 'src/lib/auth.js') {
      if (!/requireEmailVerification:\s*true/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'insecure-auth-config',
          message: 'Better Auth MUST have requireEmailVerification: true for B2B security.',
          severity: 'FATAL',
        })
      }
    }

    // 7. Sitemap AEO strictness
    if (relPath === 'src/app/sitemap.ts' || relPath === 'src/app/sitemap.js') {
      if (/lastModified:\s*new\s+Date\(\)/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'fake-sitemap-date',
          message:
            'lastModified: new Date() is forbidden in sitemap.ts. You MUST use the real updatedAt date from the database to preserve Crawl Budget.',
          severity: 'FATAL',
        })
      }
    }

    // 8. Globals CSS Rules
    if (relPath === 'src/app/globals.css' || relPath === 'src/globals.css') {
      if (/@import\s+url\(/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'css-import-url',
          message:
            '@import url() is forbidden in globals.css. Use next/font to eliminate FOUT and CLS.',
          severity: 'FATAL',
        })
      }
    }

    // 9. Accessibility (Images)
    if (/<(?:img|Image)[^>]+>/.test(content)) {
      if (
        /(?:<img|<Image)[^>]*(?:alt=(?:['"]['"]|\{\s*['"]['"]\s*\}|undefined|null))[^>]*>/.test(
          content,
        ) ||
        (/(?:<img|<Image)[^>]+>/.test(content) && !/(?:<img|<Image)[^>]+alt=/.test(content))
      ) {
        violations.push({
          file: relPath,
          rule: 'missing-alt-text',
          message: 'Images MUST have meaningful "alt" text for AEO and SEO.',
          severity: 'FATAL',
        })
      }
    }

    // 10. Shadcn strictness (Ban primitive components)
    if (!relPath.startsWith('src/components/ui/')) {
      if (/export\s+function\s+(Button|Input|Card|Modal|Dialog)\s*\(/.test(content)) {
        violations.push({
          file: relPath,
          rule: 'banned-custom-primitive-ui',
          message:
            'Do not build primitive UI components from scratch. You MUST use Shadcn UI (e.g., npx shadcn@latest add button).',
          severity: 'FATAL',
        })
      }
    }
  } catch {
    // Ignore read errors
  }
  return violations
}
