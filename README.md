<div align="center">
  <br />
  <h1>🚀 FLUKSOS</h1>
  <p><b>The Top 1% Senior Platform Engineering Engine</b></p>
  <br />
</div>

> **Fluksos** is not a simple Next.js boilerplate generator. It is a deterministic **Platform Engineering Engine** designed to scaffold production-hardened, ultra-modern architectures across multiple tech stacks with zero hallucination. Built for Senior and Staff Engineers who demand architectural perfection from day zero.

---

## 🌟 Why Fluksos? The "Top 1%" Difference

Most generators hand you a basic starter kit and leave the hard parts to you. Fluksos delivers an ecosystem ready to scale to millions of requests, embedding industry best practices across infrastructure, security, and observability.

### 🛡️ Uncompromising Security & CI/CD
- **Automated DAST & SCA**: Pre-configured GitHub Actions for **OWASP ZAP** (Dynamic Application Security Testing) and **Trivy** (Container Vulnerability Scanning).
- **Edge Proxies & Rate Limiting**: Built-in container-native Traefik v3 proxy acting as an API Gateway, shielding your servers from brute force attacks.
- **Hardened Configurations**: Strict Content-Security-Policies (CSP), HSTS, and rate-limiting natively implemented.

### 📊 Enterprise Observability (LGTM Stack)
- **Zero-Config Telemetry**: Scaffolds ship with a full Docker Compose observability stack powered by Grafana Alloy.
- **Traces, Metrics, Logs**: Seamless integration with Prometheus, Loki, and Tempo via OpenTelemetry.
- **Continuous Profiling**: Grafana Pyroscope enabled out-of-the-box for granular CPU/Memory bottleneck identification.

### 🧠 AST Validation Tribunal
- **Proactive Governance**: Fluksos includes a custom, regex-based AST parser (`ast-parser.js`) that runs during pre-commit hooks via Lefthook.
- **Strict Boundaries**: Automatically bans anti-patterns (e.g., `createContext` when Zustand is required, `redux`, missing `server-only` boundaries) before they ever reach a Pull Request.

---

## 📚 Supported & Roadmap Stacks

Fluksos is designed to be a multi-stack engine. Each stack brings its own set of generators, validators, and architectural tiers.

| Stack | Status | Description |
| :--- | :--- | :--- |
| **`nextjs`** | 🟢 **Available** | Next.js 15+ App Router, Turbopack, Biome, Tailwind v4, Drizzle ORM, AEO |
| **`react-vite`** | 🟡 **Roadmap** | Fast SPAs, internal Admin Dashboards, React Query, Zustand |
| **`nestjs`** | 🟡 **Roadmap** | Enterprise backend microservices powered by Fastify and DDD architecture |

---

## 🚀 Quick Start (Next.js Flagship)

Ensure you have Node.js 20+ and `pnpm` installed.

```bash
# Scaffold a new Tier 3 Enterprise Workspace for Next.js
npx fluksos@latest init nextjs my-app ./my-app --tier 3
```

> **Note**: Fluksos requires `pnpm` for its strict Turborepo workspace configuration.

### The 3 Tiers of Architecture (Next.js Example)

- **Tier 1: Minimalist Edge** — Pure Next.js App Router, Tailwind v4, and Biome. No heavy backend dependencies.
- **Tier 2: Serverless Scale** — Introduces Zustand (isolated UI state) and Valibot. Ready for serverless architectures with Upstash Rate Limiting.
- **Tier 3: Container Native** — Fully dockerized environment with PostgreSQL (pgvector), Drizzle CI/CD migrations, TCP Redis, Traefik, and the complete LGTM Observability Stack.

---

## 🛠️ The Fluksos Ecosystem

### Code Generation
Never write boilerplate manually again. Fluksos maintains strict boundaries via generators:

```bash
npx fluksos@latest generate nextjs action CreateUser ./src/actions
npx fluksos@latest generate nextjs rpc-hook useUser ./src/hooks
```

### Continuous Validation
Run the AST validation tribunal against your existing codebase to ensure architectural integrity:

```bash
npx fluksos@latest validate all ./my-app
```

---

## 📖 Internal Documentation

For internal contributors and AI agents working on this CLI, refer strictly to [AGENTS.md](./AGENTS.md).

## 🤝 Contributing
All PRs must pass the rigorous Vitest architecture validations. The Fluksos engine uses a mock-project fixture to run integration tests against its own generated files. See `.github/PULL_REQUEST_TEMPLATE.md` for guidelines.

## 📄 License
MIT © Fluksos
