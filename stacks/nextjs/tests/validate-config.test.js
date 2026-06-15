import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateConfig } from '../scripts/validate-config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('Validate Config', () => {
  it('should detect forbidden dependencies', () => {
    const mockDir = join(__dirname, 'mock-project-config');
    mkdirSync(mockDir, { recursive: true });
    writeFileSync(
      join(mockDir, 'package.json'),
      JSON.stringify({
        dependencies: {
          axios: '1.0.0',
          valibot: '1.0.0'
        }
      })
    );

    const violations = validateConfig(mockDir);
    expect(violations.find((v) => v.rule.includes('axios'))).toBeDefined();
    expect(violations.find((v) => v.rule.includes('valibot'))).toBeUndefined();
  });
});
