---
description: The Enterprise Scaffolding & Validation Engine
audience: End Users, Developers, Open Source Community
---

<div align="center">

<pre style="font-family: monospace; display: inline-block; text-align: left; color: #10b981; font-weight: bold;">
███████╗██╗     ██╗   ██╗██╗  ██╗███████╗ ██████╗ ███████╗
██╔════╝██║     ██║   ██║██║ ██╔╝██╔════╝██╔═══██╗██╔════╝
█████╗  ██║     ██║   ██║█████╔╝ ███████╗██║   ██║███████╗
██╔══╝  ██║     ██║   ██║██╔═██╗ ╚════██║██║   ██║╚════██║
██║     ███████╗╚██████╔╝██║  ██╗███████║╚██████╔╝███████║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
</pre>

**The Enterprise Scaffolding & Validation Engine**

*Deterministic, opinionated scaffolds for production-grade applications. Zero config, 100% governance.*

<br/>

[![npm version](https://img.shields.io/npm/v/fluksos?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/fluksos)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://github.com/pasqualinigui/fluksos/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.6.0-f69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## ⚡ The Philosophy

Fluksos is not a boilerplate. It is a **Governance Engine**. 
When senior engineers start a new project, they spend weeks configuring Turborepo, Linters, Observability, CI hooks, and Security Policies. Fluksos automates this entirely, delivering a `Top 1%` architecture in a single command.

- 🛡️ **Built-in AST Validation:** A custom AST parser actively bans bad code (like using `axios` or fetching directly in client components).
- 🔒 **Zero-Day Security:** Ships out-of-the-box with strict CSP Headers, HSTS, and Upstash Rate Limiting to prevent brute-force attacks.
- 🚀 **Performance Obsessed:** Powered by Turborepo, Biome, and Turbopack. Tests are handled by Vitest.
- 🤖 **AEO Native:** Built-in AI Engine Optimization (`/llms.txt` and server-rendered JSON-LD) so LLMs can read your app perfectly.

---

## 📦 Quick Start

Initialize a brand new Enterprise application. You can either install the CLI globally or run it on-demand via `npx`.

### Option A: Global Install (Recommended)
```bash
# 1. Install globally
npm install -g fluksos

# 2. Explore available stacks
fluksos --help

# 3. Generate a project
fluksos init nextjs my-app --tier 3
```

### Option B: On-Demand (No install)
```bash
npx fluksos@latest
```

*(Note: We strongly recommend running the command in an empty directory or allowing it to create `my-app` for you.)*

---

## 📚 The Technical Manual

Fluksos is massive. To keep this page clean, we have segmented our deep-dive technical documentation into the `docs/` folder. Choose your path below to explore the capabilities of each stack:

### 🚀 Next.js Stack
*The flagship full-stack ecosystem featuring App Router, Turbopack, and Biome.*

| Documentation | Description |
|---|---|
| [**Architecture & Tiers**](./docs/NEXTJS_STACK.md) | Deep dive into the Architecture Tiers, Turborepo layout, AEO, Observability (Grafana/K6), and the Docker DB Workflow. |
| [**Security & Rate Limiting**](./docs/SECURITY.md) | **Next.js specific** Zero-Day security via CSP, HSTS, Upstash Rate Limiting, and strict Better Auth defaults. |
| [**Code Generators**](./docs/GENERATORS.md) | How to auto-generate **Next.js Server Actions** and **Hono RPC Hooks**, and the "Golden Rules" behind them. |
| [**AST Validators**](./docs/VALIDATORS.md) | The **React/Next.js Tribunal**. Understand how our AST parser runs on `git commit` to block React-specific architectural crimes. |

### 🦁 NestJS Stack (Roadmap)
*Enterprise backend microservices powered by Fastify and Drizzle.*
- Documentation coming soon.

### 🐘 PostgreSQL Stack (Roadmap)
*Standalone database architecture and migration scaffolding.*
- Documentation coming soon.

---

## 🧑‍💻 For Contributors

Are you an open-source contributor looking to add a new stack (e.g., NestJS) or modify the core engine? Please read the internal manuals:

- [**AGENTS.md**](./AGENTS.md): The core mapping of the CLI dispatcher and rules for AI Assistants.
- [**Next.js Maintainer Guide**](./stacks/nextjs/README.md): The internal pipeline of `init_project.js` and how the templates are wired.

---

<div align="center">
  Built with obsession for clean architecture. <br/>
  <a href="https://github.com/pasqualinigui">Follow the Creator</a>
</div>
