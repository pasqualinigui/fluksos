---
"fluksos": patch
---

- **Ergonomics:** Added ANSI colors to CLI post-install instructions for better readability.
- **Bugfix (Observability):** Removed duplicate `4317` port exposure on the `tempo` container to prevent port allocation crashes alongside OTel Collector.
- **Bugfix (CLI):** Suppressed Node 24 DEP0190 warning by passing args as a joined string to `spawnSync` when `shell: true` is enabled on Windows.
- **Ergonomics:** Appended `--config=drizzle.config.ts` to `package.json` DB scripts to silence Drizzle Kit default path warnings.
