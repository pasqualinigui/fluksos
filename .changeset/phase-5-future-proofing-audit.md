---
"fluksos": patch
---

- **Future-Proofing (Validators):** Next.js AST, config, and UI-state validators now gracefully skip analysis (`[SKIP]`) if run inside a non-Next.js repository, preventing false positives and crashes for upcoming stacks.
- **Security (Env Variables):** `validate-config.js` now strictly compares the user's `.env` against the required `.env.example` keys (Tier 3). Missing keys will trigger a `FATAL` compilation/pre-push failure, eliminating silent runtime crashes caused by missing secrets.
- **Roadmap Update:** Promoted "React + Vite" and "NestJS" as the primary future stacks in `bin/cli.js`, `AGENTS.md`, and `README.md`, removing PostgreSQL as a standalone stack.
- **Housekeeping:** Cleaned up lint warnings, missing imports, and unused code. Verified tests maintain negative-testing integrity over `mock-project` fixtures.