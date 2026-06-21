---
"fluksos": patch
---

- **Security (Templates):** Secured `docker-compose.yml` (Tier 3 and Observability) by explicitly binding all exposed ports to `127.0.0.1`, preventing accidental exposure of internal services (like PostgreSQL, Grafana, and Prometheus) to public networks on host machines.
- **Security (Grafana):** Removed `GF_AUTH_ANONYMOUS_ENABLED` and `GF_AUTH_ANONYMOUS_ORG_ROLE=Admin` from the observability template, closing a vulnerability where the telemetry dashboard was exposed with full admin permissions without authentication.
- **Stability (Lefthook):** Updated the generated `lefthook.yml` to use `pnpm exec fluksos validate all .` instead of `npx fluksos@latest`. This guarantees that pre-push validations run against the deterministically installed local version of the CLI, preventing sudden breakages in user pipelines when new major versions are released.