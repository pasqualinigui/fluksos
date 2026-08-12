`<div align="center">
  <br />
  <h1>🚀 FLUKSOS</h1>
  <p><b>The Top 1% Senior Scaffolding Engine for Enterprise Web Applications</b></p>
  <br />
</div>

> **Fluksos** is not just another CLI. It is a deterministic engine designed to scaffold production-hardened, ultra-modern Next.js monorepos with zero hallucination. Built for Senior and Staff Engineers who demand architectural perfection from day zero.

---

## 🌟 Why Fluksos? The "Top 1%" Difference

Most generators give you a basic `create-next-app` and leave the hard parts to you. Fluksos delivers an ecosystem ready to scale to millions of requests, embedding industry best practices across three distinct tiers of infrastructure.

### 🛡️ Uncompromising Security & CI/CD
- **Traefik Edge Proxy**: Built-in container-native Traefik v3 proxy acting as an API Gateway, shielding your Next.js node server from brute force attacks.
- **Automated DAST & SCA**: Pre-configured GitHub Actions for **OWASP ZAP** (Dynamic Application Security Testing) and **Trivy** (Container Vulnerability Scanning).
- **Hardened Configurations**: Strict Content-Security-Policies (CSP), HSTS, and rate-limiting natively implemented.

### 📊 Enterprise Observability (LGTM Stack)
- **Zero-Config Telemetry**: Tier 3 ships with a full Docker Compose observability stack powered by Grafana Alloy.
- **Traces, Metrics, Logs**: Seamless integration with Prometheus, Loki, and Tempo via OpenTelemetry.
- **Continuous Profiling**: Grafana Pyroscope enabled out-of-the-box for granular CPU/Memory bottleneck identification.

### ⚡ Extreme Performance
- **TCP Redis Over HTTP**: Ditched slow serverless abstractions in favor of bare-metal TCP Redis (ioredis) for sub-millisecond caching and rate limiting in production.
- **K6 Load Testing**: Pre-written K6 performance scripts using the new v2.0+ Assertion API to validate your throughput limits.

### 🤖 AI Engine Optimization (AEO)
- Built-in `llms.txt` and `/llms-full.txt` API routes to ensure LLM crawlers (like ChatGPT, Claude, and Perplexity) index your application perfectly.
- Semantic HTML and enforced Alt-texts validated strictly at scaffolding time.

---

## 🏗️ The 3 Tiers of Architecture

Fluksos allows you to scaffold based on your deployment strategy:

### **Tier 1: Minimalist Edge**
Perfect for Vercel/Netlify deployments. Pure Next.js App Router, Tailwind v4, and Biome. No heavy backend dependencies.

### **Tier 2: Serverless Scale**
Introduces Zustand (isolated UI state) and Valibot. Ready for serverless architectures with basic API route scaffolding.

### **Tier 3: Container Native (The Enterprise Standard)**
A fully dockerized environment. Includes:
- Next.js running in a lightweight Node Alpine container.
- PostgreSQL + pgvector for AI workloads.
- Drizzle ORM with automated CI/CD Migration scripts (`migrate.ts`).
- TCP Redis container for high-speed rate-limiting.
- Traefik API Gateway.
- Full LGTM Observability Stack.

---

## 🚀 Quick Start

Ensure you have Node.js 20+ and `pnpm` installed.

```bash
# Scaffold a new Tier 3 Enterprise Workspace
npx fluksos@latest init nextjs my-app ./my-app --tier 3
```

> **Note**: Fluksos requires `pnpm` for its strict Turborepo workspace configuration.

---

## 🛠️ The Fluksos Ecosystem

### Code Generation
Never write boilerplate Server Actions or RPC hooks manually again. Fluksos maintains strict architectural boundaries:

```bash
npx fluksos@latest generate action
npx fluksos@latest generate rpc-hook
```

### Continuous Validation
Fluksos includes a custom AST parser to enforce rules that standard linters miss (e.g., banning `createContext`, enforcing `server-only` boundaries).

```bash
npx fluksos@latest validate
```

---

## 📚 Documentation

For internal contributors and AI agents working on this CLI, refer strictly to [AGENTS.md](./AGENTS.md).

## 🤝 Contributing
All PRs must pass the rigorous Vitest architecture validations. See `.github/PULL_REQUEST_TEMPLATE.md` for guidelines.

## 📄 License
MIT © Fluksos
