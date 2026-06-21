# fluksos

## 1.0.28

### Patch Changes

- d3b74bf: - **Ergonomics:** Added ANSI colors to CLI post-install instructions for better readability.
  - **Bugfix (Observability):** Removed duplicate `4317` port exposure on the `tempo` container to prevent port allocation crashes alongside OTel Collector.
  - **Bugfix (CLI):** Suppressed Node 24 DEP0190 warning by passing args as a joined string to `spawnSync` when `shell: true` is enabled on Windows.
  - **Ergonomics:** Appended `--config=drizzle.config.ts` to `package.json` DB scripts to silence Drizzle Kit default path warnings.

## 1.0.27

### Patch Changes

- c7ca254: - **Bugfix:** Fixed `create-next-app` silent failure on Windows caused by incorrect alias quoting. The global `runCommand` executor now correctly respects `shell: true` on Windows, ensuring arguments are passed safely without path corruption.

## 1.0.26

### Patch Changes

- e500748: - **Bugfix:** Fixed an issue where the CLI falsely reported `pnpm` as uninstalled on Windows environments. The `spawnSync` command now properly utilizes `shell: true` on Windows, resolving the `EINVAL` error when verifying preconditions.

## 1.0.25

### Patch Changes

- b8929c0: - **Future-Proofing (Validators):** Next.js AST, config, and UI-state validators now gracefully skip analysis (`[SKIP]`) if run inside a non-Next.js repository, preventing false positives and crashes for upcoming stacks.
  - **Security (Env Variables):** `validate-config.js` now strictly compares the user's `.env` against the required `.env.example` keys (Tier 3). Missing keys will trigger a `FATAL` compilation/pre-push failure, eliminating silent runtime crashes caused by missing secrets.
  - **Roadmap Update:** Promoted "React + Vite" and "NestJS" as the primary future stacks in `bin/cli.js`, `AGENTS.md`, and `README.md`, removing PostgreSQL as a standalone stack.
  - **Housekeeping:** Cleaned up lint warnings, missing imports, and unused code. Verified tests maintain negative-testing integrity over `mock-project` fixtures.

## 1.0.24

### Patch Changes

- bf98a42: - **Security (Templates):** Secured `docker-compose.yml` (Tier 3 and Observability) by explicitly binding all exposed ports to `127.0.0.1`, preventing accidental exposure of internal services (like PostgreSQL, Grafana, and Prometheus) to public networks on host machines.
  - **Security (Grafana):** Removed `GF_AUTH_ANONYMOUS_ENABLED` and `GF_AUTH_ANONYMOUS_ORG_ROLE=Admin` from the observability template, closing a vulnerability where the telemetry dashboard was exposed with full admin permissions without authentication.
  - **Stability (Lefthook):** Updated the generated `lefthook.yml` to use `pnpm exec fluksos validate all .` instead of `npx fluksos@latest`. This guarantees that pre-push validations run against the deterministically installed local version of the CLI, preventing sudden breakages in user pipelines when new major versions are released.

## 1.0.23

### Patch Changes

- 0501239: - **AST Engine Performance & Security:** Fixed ReDoS (Catastrophic Backtracking) vulnerabilities in `ast-parser.js` by optimizing greedy regex patterns to possessive equivalents.
  - **AST False Positives:** Implemented a pre-processor to strip single and multi-line comments from `.js/.ts` files before AST analysis, preventing commented-out code from triggering architectural violations.
  - **I/O Resilience:** Refactored the internal `walk` directory functions in validators to catch and ignore `EACCES` and `ENOENT` filesystem errors instead of crashing, and implemented loop-detection to prevent infinite recursion on symlinks.
  - **Config Validations:** Fixed a silent bug in `validate-config.js` where malformed `package.json` or `components.json` files would fail silently and pass validation. Malformed JSON will now correctly emit a `FATAL` error.
- a426338: - **Generators Integrity:** Hardened CLI generators (`generate_action`, `generate_rpc_hook`, `generate_schema`) against path traversal vulnerabilities by enforcing strict alphanumeric validation for entity names.
  - **Safety:** Implemented idempotency checks on code generation. The generators will now exit with a safe error message if the target file already exists, preventing accidental code overwrites or data loss during development.

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
