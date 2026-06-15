import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateArchitecture } from '../validate-architecture.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('Validate Architecture', () => {
  it('should find missing server-only imports in services', () => {
    const mockDir = join(__dirname, 'mock-project');
    const violations = validateArchitecture(mockDir);

    const serverOnlyViolation = violations.find((v) => v.rule === 'missing-server-only');
    expect(serverOnlyViolation).toBeDefined();
    expect(serverOnlyViolation.file).toContain('invalid.service.ts');
  });

  it('should find business logic in page.tsx', () => {
    const mockDir = join(__dirname, 'mock-project');
    const violations = validateArchitecture(mockDir);

    const logicViolation = violations.find((v) => v.rule === 'business-logic-in-page');
    expect(logicViolation).toBeDefined();
    expect(logicViolation.file).toContain('invalid-page.tsx');
  });
});
