import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateUiState } from '../scripts/validate-ui-state.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('Validate UI State', () => {
  it('should detect fetching in zustand stores', () => {
    const mockDir = join(__dirname, 'mock-project-ui');
    mkdirSync(join(mockDir, 'src/stores'), { recursive: true });
    writeFileSync(
      join(mockDir, 'src/stores/bad.store.ts'),
      'import { fetcher } from "@/lib/fetcher"; export const useStore = create(() => ({}));'
    );
    writeFileSync(
      join(mockDir, 'src/stores/good.store.ts'),
      'export const useStore = create(() => ({ isOpen: false }));'
    );

    const violations = validateUiState(mockDir);
    expect(violations.find((v) => v.file.includes('bad.store.ts'))).toBeDefined();
    expect(violations.find((v) => v.file.includes('good.store.ts'))).toBeUndefined();
  });
});
