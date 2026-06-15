<div align="center">

<pre style="font-family: monospace; display: inline-block; text-align: left;">
███████╗██╗     ██╗   ██╗██╗  ██╗███████╗ ██████╗ ███████╗
██╔════╝██║     ██║   ██║██║ ██╔╝██╔════╝██╔═══██╗██╔════╝
█████╗  ██║     ██║   ██║█████╔╝ ███████╗██║   ██║███████╗
██╔══╝  ██║     ██║   ██║██╔═██╗ ╚════██║██║   ██║╚════██║
██║     ███████╗╚██████╔╝██║  ██╗███████║╚██████╔╝███████║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
</pre>

**The Enterprise Stack Generator**

*Deterministic, opinionated scaffolds for production-grade applications.*

<br/>

[![npm version](https://img.shields.io/npm/v/fluksos?style=flat-square&color=black)](https://www.npmjs.com/package/fluksos)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](https://github.com/pasqualinigui/fluksos/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-black?style=flat-square)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.5.2-black?style=flat-square)](https://pnpm.io/)
[![GitHub stars](https://img.shields.io/github/stars/pasqualinigui/fluksos?style=flat-square&color=black)](https://github.com/pasqualinigui/fluksos/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/pasqualinigui/fluksos?style=flat-square&color=black)](https://github.com/pasqualinigui/fluksos/issues)

</div>

---

## What is Fluksos?

Fluksos is an **architectural CLI** — not a template, not a starter kit. It is a deterministic code generator that enforces strict boundaries, modern tooling, and production-grade defaults from day zero.

A single command produces a fully wired Turborepo monorepo with typed server actions, edge-ready APIs, observability pipelines, and automated architecture validation via AST analysis. No configuration drift. No manual wiring. No legacy defaults.

The output is not a skeleton — it is a senior-level foundation ready for teams.

---

## Quick Start

```bash
# Install globally
npm install -g fluksos

# Or use directly with npx (no global install needed)
npx fluksos@latest

# Explore available stacks, tiers, and commands
fluksos --help
fluksos nextjs --help
```

Once you know what you want:

```bash
# Example: scaffold a full-stack Next.js Tier 3 workspace
fluksos init nextjs my-app ./my-app --tier 3
cd my-app
pnpm dev
```

> **Requires**: Node.js >= 22, pnpm >= 9 installed globally (`npm install -g pnpm`).

---

## Available Stacks

| Stack | Status | Description |
|-------|--------|-------------|
| `nextjs` | **Available** | Next.js 16, App Router, Turbopack, Biome, Drizzle, Better Auth, Hono Edge RPC |
| `nestjs` | Roadmap | Fastify, Modules, Guards, Interceptors |
| `postgres` | Roadmap | Docker Compose, pgvector, Drizzle Migrations |

---

## CLI Reference

### `fluksos init <stack> <project-name> <target-dir> [options]`

Scaffolds a new project from a registered stack.

```bash
fluksos init nextjs my-app ./my-app --tier 3
fluksos init nextjs my-app ./my-app --tier 1 --no-install --no-git
```

| Option | Description |
|--------|-------------|
| `--tier 1\|2\|3` | Architectural tier (default: `1`) |
| `--no-install` | Skip `pnpm install` — useful in CI or offline environments |
| `--no-git` | Skip `git init` and Lefthook setup |

### `fluksos generate <stack> <generator> <Name> <target-dir>`

Generates typed, pre-wired code into an existing Fluksos project.

```bash
fluksos generate nextjs action CreateUser ./apps/web
fluksos generate nextjs rpc useUserProfile ./apps/web
```

| Generator | Description |
|-----------|-------------|
| `action` | Generates a type-safe Server Action using `next-safe-action` and Valibot |
| `rpc` | Generates a typed Hono RPC hook using `@tanstack/react-query` |

### `fluksos validate <stack|all> <target-dir>`

Runs all registered validators against an existing project directory.

```bash
fluksos validate nextjs ./my-app
fluksos validate all ./my-app
```

Validators perform static analysis, AST inspection, and configuration checks. A non-zero exit code indicates violations. Designed for use in CI pipelines.

### `fluksos <stack> --help`

Prints tier details, available generators, and validator descriptions for a specific stack.

```bash
fluksos nextjs --help
```

---

## Next.js Stack — Architecture Tiers

The `nextjs` stack uses a tiered system to match project scope. Each tier is a strict superset of the previous.

### Tier 1 — Frontend

Pure frontend. Ideal for static sites, marketing pages, or applications that consume an external API.

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16.x | Framework (App Router + Turbopack) |
| React | 19.x | UI runtime |
| TailwindCSS | v4 | Styling (CSS-native, no config file) |
| Biome | 2.x | Formatting & linting (replaces Prettier + ESLint) |
| TypeScript | 6.x | Type system |
| Vitest | 4.x | Unit & integration testing |
| OpenTelemetry | 1.x | Observability tracing |
| Sentry | 10.x | Error monitoring |
| Lefthook | 2.x | Pre-commit Git hooks |
| Turborepo | 2.x | Monorepo task orchestration |

### Tier 2 — State & Validation

Extends Tier 1 with client-side state management and validated server actions.

| Technology | Version | Role |
|------------|---------|------|
| Zustand | 5.x | UI state management |
| Valibot | 1.x | Schema validation |
| next-safe-action | 8.x | Type-safe Server Actions |

### Tier 3 — Full-Stack

The complete production tier. Extends Tier 2 with a full database, authentication, and typed API layer.

| Technology | Version | Role |
|------------|---------|------|
| Drizzle ORM | 0.45.x | Type-safe ORM |
| drizzle-kit | 0.31.x | Migration & studio tooling |
| `pg` + `@types/pg` | 8.x | Node.js PostgreSQL client driver — required by Drizzle ORM to connect to a Postgres instance |
| Better Auth | 1.6.x | Authentication (email verification enforced) |
| TanStack Query | 5.x | Async state & caching for client components |
| Hono Edge RPC | (via proxy.ts) | Type-safe edge API layer |

---

## What Gets Generated

### Workspace Layout

```
my-app/
├── apps/
│   └── web/                   # Next.js application
│       ├── src/
│       │   ├── app/           # App Router (RSC-first)
│       │   │   ├── globals.css
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── robots.ts          # Dynamic robots (env-aware)
│       │   │   ├── sitemap.ts         # Dynamic sitemap (db-driven)
│       │   │   ├── llms.txt/          # AEO — LLM discovery endpoint
│       │   │   └── llms-full.txt/     # AEO — Full content bundle
│       │   ├── components/
│       │   │   └── seo/
│       │   │       └── json-ld.tsx    # Structured data (Server Component)
│       │   ├── config/
│       │   │   └── env.ts             # Type-safe environment variables
│       │   ├── lib/
│       │   │   ├── utils.ts
│       │   │   ├── safe-action.ts     # (Tier 2+)
│       │   │   ├── fetcher.server.ts  # (Tier 2+)
│       │   │   └── auth.ts            # (Tier 3)
│       │   ├── db/
│       │   │   └── index.ts           # (Tier 3) Drizzle client
│       │   └── proxy.ts               # Edge routing (replaces middleware.ts)
│       ├── public/
│       │   └── mirrors/home.md        # AEO — Markdown mirror of homepage
│       ├── next.config.ts
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       ├── components.json            # Shadcn UI registry config
│       ├── drizzle.config.ts          # (Tier 3)
│       └── postcss.config.mjs
├── observability/                     # OpenTelemetry + Grafana stack
├── tests/
│   └── performance/k6/                # K6 load testing scripts
├── biome.json                         # Workspace-level Biome config
├── lefthook.yml                       # Pre-commit hook definitions
├── turbo.json
└── pnpm-workspace.yaml
```

### Built-in Constraints

Fluksos enforces architectural rules at generation time and continuously via `fluksos validate`. Violations exit with a non-zero code and include the rule name, file, and remediation message.

**Architecture rules enforced:**

- `page.tsx` files must be React Server Components — `"use client"` is forbidden
- `src/services/`, `src/actions/`, and `src/db/` must import `server-only`
- `middleware.ts` is banned — use `proxy.ts` for edge routing (Next.js 16.2+)
- `tailwind.config.ts` is banned — TailwindCSS v4 is configured via `globals.css`
- `postcss.config.js` must be an ES module (`.mjs`)
- Static `robots.txt` and `sitemap.xml` are banned — use the dynamic App Router equivalents
- `sitemap.ts` must reference real `updatedAt` timestamps — `new Date()` is banned
- `unstable_cache` and `fetch({ cache: "force-cache" })` are banned — use `"use cache"` directive
- Global state must use Zustand — React Context, Redux are banned
- HTTP clients must use `fetcher.ts` or Hono RPC — Axios is banned
- Client Components must not access `db` directly
- `useEffect` data fetching must use TanStack Query — raw `fetch()` in effects is banned
- Zustand stores must not contain remote data logic
- Better Auth must have `requireEmailVerification: true`
- All `<img>` / `<Image>` elements must have meaningful `alt` text
- JSON-LD structured data must be in Server Components, never Client Components
- Primitive UI components (Button, Input, Card) must use Shadcn UI
- Marketing `page.tsx` files must have a co-located `opengraph-image.(png|jpg|tsx)`
- `// @ts-ignore` is globally banned

---

## Observability

Every generated project includes an observability stack:

- **OpenTelemetry** (`@vercel/otel`) — instrumented in `next.config.ts`
- **Sentry** (`@sentry/nextjs`) — error monitoring with source maps
- **Docker Compose** — pre-configured Grafana + Prometheus + Tempo stack in `observability/`
- **K6** — performance/load test scripts in `tests/performance/k6/`

```bash
# Start the local observability stack
docker compose -f observability/docker-compose.observability.yml up -d

# Run smoke test
cd tests/performance/k6 && k6 run smoke.js
```

---

## AEO — AI Engine Optimization

Fluksos ships with first-class AEO support, making generated applications discoverable by LLMs and AI crawlers:

- **`/llms.txt`** — A structured, machine-readable product summary served as a dynamic route
- **`/llms-full.txt`** — A full content bundle for GitHub Copilot and Anthropic API ingestion
- **`/mirrors/home.md`** — A Markdown mirror of the homepage for AI-parseable content
- **JSON-LD** — Structured data components rendered server-side only
- **Dynamic sitemap** — Enforced via validator to use real database timestamps

---

## Database Workflow (Tier 3)

```bash
# Generate migration files from schema changes
pnpm --filter web db:generate

# Apply migrations
pnpm --filter web db:migrate

# Open Drizzle Studio
pnpm --filter web db:studio
```

---

## Workspace Scripts

```bash
pnpm dev          # turbo run dev (all apps)
pnpm build        # turbo run build
pnpm typecheck    # turbo run typecheck (strict, --noEmit)
pnpm test         # turbo run test (Vitest)
pnpm coverage     # turbo run coverage
pnpm lint         # biome check .
pnpm lint:fix     # biome check --write .
pnpm format       # biome format --write .
```

---

## Contributing

Fluksos uses AI-assisted development workflows. If you are contributing, or working with an AI coding assistant in this repository, read [AGENTS.md](./AGENTS.md) first. It documents the repository architecture, constraints, and the Slash Command system that governs all structural changes.

---

## License

MIT — see [LICENSE](./LICENSE).
