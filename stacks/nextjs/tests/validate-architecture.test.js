import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { validateArchitecture } from '../scripts/validate-architecture.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('Validate Architecture', () => {
  it('should find missing server-only imports in services', () => {
    const mockDir = join(__dirname, 'mock-project')
    const violations = validateArchitecture(mockDir)

    const serverOnlyViolation = violations.find((v) => v.rule === 'missing-server-only')
    expect(serverOnlyViolation).toBeDefined()
    expect(serverOnlyViolation.file).toContain('invalid.service.ts')
  })

  it('should find business logic in page.tsx', () => {
    const mockDir = join(__dirname, 'mock-project')
    const violations = validateArchitecture(mockDir)

    const logicViolation = violations.find((v) => v.rule === 'business-logic-in-page')
    expect(logicViolation).toBeDefined()
    expect(logicViolation.file).toContain('invalid-page.tsx')
  })

  it('should find PG18 senior standard violations (md5, db-in-controller, legacy-uuid)', () => {
    const mockDir = join(__dirname, 'mock-project')
    const violations = validateArchitecture(mockDir)

    const md5Violation = violations.find((v) => v.rule === 'banned-md5')
    const dbViolation = violations.find((v) => v.rule === 'db-in-controller')
    const uuidViolation = violations.find((v) => v.rule === 'legacy-uuid')

    expect(md5Violation).toBeDefined()
    expect(md5Violation.file).toContain('route.ts')

    expect(dbViolation).toBeDefined()
    expect(dbViolation.file).toContain('route.ts')

    expect(uuidViolation).toBeDefined()
    expect(uuidViolation.file).toContain('route.ts')
  })
})
