---
description: Deep Dive into the Next.js Architecture Stack for Fluksos
audience: End Users, Developers
---

# 🚀 Next.js Architecture Stack

The `nextjs` stack in **Fluksos** is not a boilerplate. It is a deterministic, enterprise-grade scaffolding engine that guarantees a secure, scalable, and highly performant architecture from **Day 1**.

By combining the latest patterns in the React ecosystem with strict constraints, Fluksos removes the "decision fatigue" that senior teams face when setting up a new monorepo.

---

## 🏗️ The Tier System

Fluksos introduces **Architecture Tiers** via the `--tier` flag. This allows you to generate a project that matches your exact complexity requirements without bringing in bloated dependencies.

### Tier 1: The Modern Frontend
**Target:** Landing pages, static sites, or lightweight web apps.
- **Framework:** Next.js 16 (App Router only).
- **Styling:** TailwindCSS v4.
- **Engine:** Turbopack for instantaneous local builds.
- **UI Architecture:** Sever Components by default, minimal client boundaries.

### Tier 2: Frontend + Safe State
**Target:** SaaS dashboards, highly interactive client applications.
*Includes everything from Tier 1, plus:*
- **Client State:** `zustand` (Redux and Context API are banned by our AST Parser).
- **Schema Validation:** `valibot` (Lighter and faster than Zod).
- **Server Actions:** `next-safe-action` pre-configured. Forces all mutations to run through input validation before hitting the server.
- **Rate Limiting:** Built-in `@upstash/ratelimit` interceptor to prevent brute-force attacks on your forms.

### Tier 3: The Full-Stack Enterprise
**Target:** Complex systems requiring a robust backend, edge APIs, and an independent database.
*Includes everything from Tier 2, plus:*
- **Edge API (RPC):** `hono` integrated as a proxy router, providing end-to-end typed APIs.
- **Database ORM:** `drizzle-orm` configured for PostgreSQL 18.
- **Local DB:** Docker Compose file pre-configured with `pgvector` (ready for AI/RAG data).
- **Authentication:** `better-auth` tightly integrated with Drizzle, enforcing email verification by default.

---

## ⚡ The Technology Core

No matter what tier you choose, every Fluksos Next.js project is built on this foundation:

### 1. Turborepo Monorepo Architecture
The output is automatically structured as a `pnpm` workspace powered by **Turborepo**.
- `apps/web`: Your Next.js application.
- `packages/`: (Ready to be populated with shared UI, TS config, or internal logic).
- Cached tasks ensure your CI builds take seconds, not minutes.

### 2. Biome (The Prettier/ESLint Killer)
We use `biome` natively. It formats and lints your code in milliseconds.
- `.eslintrc.*` and `prettierrc` are **banned**.
- The `biome.json` is automatically injected at the workspace root, applying strict enterprise rules.

### 3. Comprehensive Observability
Running in production blind is amateur. Fluksos injects a complete observability suite:
- **OpenTelemetry (OTel):** Pre-configured tracing for all Server Actions and Database queries.
- **Metrics/Dashboards:** A Docker Compose file with **Grafana** and **Prometheus** ready for local telemetry analysis.
- **Load Testing:** Built-in `k6` (v2.0) scripts in `tests/` to benchmark your API limits before deploying. Native support for OpenTelemetry export and MCP (AI-Agent ready).

### 4. AEO (AI Engine Optimization) & SEO
Traditional SEO is not enough. Fluksos ensures your app is ready for LLM crawlers (ChatGPT, Claude, Perplexity):
- **`/llms.txt` and `/llms-full.txt`:** Auto-generated routes to feed context to AI bots safely.
- **Strict JSON-LD:** Enforced via our AST parser to be rendered exclusively in Server Components (since AI crawlers don't execute JS).

---

## 📦 Database & Docker Workflow (Tier 3)

When you initialize a Tier 3 project, you don't need to install Postgres locally.

1. Run `docker compose up -d` in the root.
2. A **PostgreSQL container** with `pgvector` extension starts immediately.
3. Drizzle ORM is already connected to `localhost:5432` via your `src/config/env.ts`.

Ready to deploy? A standalone `Dockerfile` is included in the Next.js app directory, optimizing your build output to drastically reduce image size by leveraging Next.js `output: 'standalone'`.
