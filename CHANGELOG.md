# fluksos

## 1.0.22

### Patch Changes

- bf3052e: - **Security (CLI Core):** Fixed command injection vulnerabilities by replacing `execSync` with `spawnSync`, preventing path traversal and shell exploits.
  - **Resilience:** Implemented Graceful Teardown (Rollback). The CLI will now clean up corrupted directories if a scaffold step fails.
  - **Cross-Platform:** Removed hardcoded POSIX variables from `package.json` injection, ensuring 100% compatibility with Windows environments.
  - **Turborepo Optimization:** Fixed false cache hits by ensuring global environment variables (`.env`) invalidate the Next.js build cache.

## 1.0.21

### Patch Changes

- 6809130: update pnpm and refine CLI header

## 1.0.20

### Patch Changes

- 0c276a6: chore: enforce provenance and secure CI workflow
