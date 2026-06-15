# Fluksos CLI — Multi-Stack Evolution Plan

## Overview

Evolve the Fluksos CLI from a single-stack Next.js scaffold into a **multi-stack enterprise generator** supporting Next.js, NestJS, and PostgreSQL — all within a **monorepo/turborepo** architecture.

**Key constraint**: Zero breakage. The existing Next.js stack (scripts, templates, tests, libs) remains **completely untouched**.

---

## Decisions — Locked In

| Decision | Answer | Rationale |
|---|---|---|
| **Command syntax** | `fluksos init nextjs <name>` (stack as 1st positional arg) | More explicit, better DX, natural subcommand pattern |
| **Backward compat** | `fluksos init <name>` without stack → assumes `nextjs` | Existing usage works identically |
| **CLI parser** | Manual switch/case (zero deps) | No external dependencies, full control, better for open-source |
| **Docker Compose** | Merged from stack fragments at init time | Each stack provides a compose fragment; `init` merges them into a single root `docker-compose.yml`. User just runs `docker compose up` |
| **Monorepo** | Always turborepo (`apps/web`, `apps/api`, `packages/db`) | Non-negotiable project standard |
| **Hono** | Edge functions only (within NestJS context) | Not a Fastify replacement — complements it for edge routes |
| **Tier 3 separation** | Phase 2+ (not now) | DB/Redis moves to `stacks/postgres/` later, when building that scaffold |
| **NestJS/Postgres tiers** | Design later, prepare the ground now | Phase 1 just sets up the routing infrastructure |
| **Language** | All code, comments, and docs in English | Open-source standard |

---

## Risk Analysis — Why This Won't Break Anything

### All scripts are 100% self-contained

| Script | Imports | Depends on cli.js? |
|---|---|---|
| [init_project.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/init_project.js) | `node:child_process`, `node:fs`, `node:path`, `node:url` | ❌ No |
| [generate_action.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/generate_action.js) | `node:fs`, `node:path` | ❌ No |
| [generate_rpc_hook.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/generate_rpc_hook.js) | `node:fs`, `node:path` | ❌ No |
| [validate-architecture.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/validate-architecture.js) | `node:fs`, `node:path`, `./lib/ast-parser.js`, `./lib/report-generator.js` | ❌ No |
| [validate-config.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/validate-config.js) | `node:fs`, `node:path`, `./lib/report-generator.js` | ❌ No |
| [validate-ui-state.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/validate-ui-state.js) | `node:fs`, `node:path`, `./lib/report-generator.js` | ❌ No |

- Scripts resolve their own paths via `__dirname` (e.g., `path.join(__dirname, '..', 'templates')`) — changing how the CLI calls them has **zero impact**.
- Tests import directly from scripts (`../validate-architecture.js`), never through the CLI.
- **Only 1 file changes: `bin/cli.js` (93 lines).**

---

## Architecture: Per-Stack Generate & Validate

### Each stack owns its generators and validators

```
stacks/
├── nextjs/scripts/
│   ├── generate_action.js          ← Server Actions (Next.js only)
│   ├── generate_rpc_hook.js        ← Hono RPC hooks (Next.js only)
│   ├── validate-architecture.js    ← App Router rules, AEO/SEO
│   ├── validate-config.js          ← Forbidden deps, tsconfig, biome
│   └── validate-ui-state.js        ← Zustand isolation rules
│
├── nestjs/scripts/                  ← Future
│   ├── generate_controller.js       ← NestJS controllers
│   ├── generate_service.js          ← NestJS services
│   └── validate-architecture.js     ← Module structure, guards, decorators
│
└── postgres/scripts/                ← Future
    ├── init_database.js             ← Docker + Drizzle setup
    ├── generate_migration.js        ← Drizzle migrations
    └── validate-schema.js           ← FK integrity, index checks
```

### Shared utilities go to `core/` (Phase 2)

```
core/
├── helpers.js              ← ensureDir, writeFile, copyTemplate (extracted from init_project.js)
└── report-generator.js     ← Report formatting (copy of existing lib/report-generator.js)
```

> [!NOTE]
> `core/` extraction is **Phase 2** — only needed when creating the NestJS stack to avoid code duplication. The Next.js scripts keep their local copies and continue working as-is.

---

## Directory Structure — Final Vision

```
fluksos-cli/
├── bin/
│   └── cli.js                          ← ✏️ ONLY CHANGE (stack-aware router)
├── core/                               ← [NEW Phase 2] Shared utilities
│   ├── helpers.js
│   └── report-generator.js
├── stacks/
│   ├── nextjs/                         ← ✅ UNTOUCHED
│   │   ├── README.md
│   │   ├── TROUBLESHOOTING.md
│   │   ├── scripts/
│   │   │   ├── init_project.js
│   │   │   ├── generate_action.js
│   │   │   ├── generate_rpc_hook.js
│   │   │   ├── validate-architecture.js
│   │   │   ├── validate-config.js
│   │   │   ├── validate-ui-state.js
│   │   │   ├── validate-skill-frontmatter.js
│   │   │   ├── log_troubleshooting.js
│   │   │   ├── package.json
│   │   │   ├── lib/
│   │   │   │   ├── ast-parser.js
│   │   │   │   └── report-generator.js
│   │   │   └── tests/
│   │   │       ├── mock-project/
│   │   │       ├── validate-architecture.test.js
│   │   │       ├── validate-config.test.js
│   │   │       └── validate-ui-state.test.js
│   │   └── templates/
│   │       ├── root/
│   │       ├── app-common/
│   │       ├── app-tier-2/
│   │       ├── app-tier-3/
│   │       ├── observability/
│   │       └── tests/
│   ├── nestjs/                         ← [NEW Phase 3+] Prepare ground only
│   │   └── (empty — created when implementing)
│   └── postgres/                       ← [NEW Phase 3+] Prepare ground only
│       └── (empty — created when implementing)
└── package.json                        ← ✏️ Cosmetic (description, keywords)
```

---

## Phase 1 — CLI Router Refactor (Scope of this PR)

### What changes

**Only 2 files.** Nothing else.

---

### [MODIFY] [cli.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/bin/cli.js)

Full replacement — from 93 lines to ~150 lines:

```javascript
#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STACKS_DIR = path.resolve(__dirname, '..', 'stacks');

const ASCII_LOGO = `
███████╗██╗     ██╗   ██╗██╗  ██╗███████╗ ██████╗ ███████╗
██╔════╝██║     ██║   ██║██║ ██╔╝██╔════╝██╔═══██╗██╔════╝
█████╗  ██║     ██║   ██║█████╔╝ ███████╗██║   ██║███████╗
██╔══╝  ██║     ██║   ██║██╔═██╗ ╚════██║██║   ██║╚════██║
██║     ███████╗╚██████╔╝██║  ██╗███████║╚██████╔╝███████║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
`;

// ==========================================
// Stack Registry
// ==========================================
const STACK_REGISTRY = {
  nextjs: {
    description: 'Next.js 16 — App Router, Turbopack, Biome, SEO/AEO',
    init: 'init_project.js',
    generators: {
      action: { script: 'generate_action.js', usage: '<ActionName> <target-dir>' },
      rpc:    { script: 'generate_rpc_hook.js', usage: '<HookName> <target-dir>' },
    },
    validators: [
      { script: 'validate-architecture.js', label: 'Architectural Validation' },
      { script: 'validate-config.js',       label: 'Configuration Validation' },
      { script: 'validate-ui-state.js',     label: 'UI State Boundary Validation' },
    ],
  },
  // Future stacks — add here when implemented:
  // nestjs: { ... },
  // postgres: { ... },
};

const DEFAULT_STACK = 'nextjs';

// ==========================================
// Helpers
// ==========================================
function getStackScriptsDir(stackName) {
  const dir = path.join(STACKS_DIR, stackName, 'scripts');
  if (!fs.existsSync(dir)) {
    console.error(`\x1b[31m[ERROR] Stack "${stackName}" is not available.\x1b[0m`);
    console.log(`Available stacks: ${Object.keys(STACK_REGISTRY).join(', ')}`);
    process.exit(1);
  }
  return dir;
}

function runScript(stackName, scriptName, scriptArgs) {
  const scriptsDir = getStackScriptsDir(stackName);
  const scriptPath = path.join(scriptsDir, scriptName);
  const safeArgs = scriptArgs.map((arg) => (arg.startsWith('--') ? arg : `"${arg}"`));
  const cmd = `node "${scriptPath}" ${safeArgs.join(' ')}`;

  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch {
    console.error(`\x1b[31m[ERROR] Failed to execute ${stackName}/${scriptName}\x1b[0m`);
    process.exit(1);
  }
}

// Resolves the stack name from an argument.
// Returns the stack name if known, or null (fallback to DEFAULT_STACK).
function resolveStack(arg) {
  if (arg && STACK_REGISTRY[arg]) return arg;
  return null;
}

function printHelp() {
  console.log('Usage:');
  console.log('');
  console.log('  Initialization:');
  console.log('    fluksos init [stack] <project-name> <target-dir> [options]');
  console.log('');
  console.log('  Generators:');
  console.log('    fluksos generate [stack] <type> <Name> <target-dir>');
  console.log('');
  console.log('  Validation:');
  console.log('    fluksos validate [stack|all] <target-dir>');
  console.log('');
  console.log('  If [stack] is omitted, defaults to "nextjs".');
  console.log('');
  console.log('  Available stacks:');
  for (const [name, config] of Object.entries(STACK_REGISTRY)) {
    console.log(`    ${name.padEnd(12)} ${config.description}`);
  }
  console.log('');
  console.log('  Examples:');
  console.log('    fluksos init my-app ./my-app --tier 2');
  console.log('    fluksos init nextjs my-app ./my-app --tier 3');
  console.log('    fluksos generate action CreateUser ./src/actions');
  console.log('    fluksos generate nextjs action CreateUser ./src/actions');
  console.log('    fluksos validate ./my-project');
  console.log('    fluksos validate nextjs ./my-project');
}

// ==========================================
// Main
// ==========================================
console.log('\x1b[1m\x1b[36m%s\x1b[0m', ASCII_LOGO);
console.log('\x1b[1m\x1b[32mThe Enterprise Stack Generator\x1b[0m\n');

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

switch (command) {
  case 'init': {
    const detected = resolveStack(args[1]);
    const stack = detected || DEFAULT_STACK;
    const forwardArgs = detected ? args.slice(2) : args.slice(1);
    const config = STACK_REGISTRY[stack];

    if (!config.init) {
      console.error(`\x1b[31m[ERROR] Stack "${stack}" does not support init.\x1b[0m`);
      process.exit(1);
    }

    runScript(stack, config.init, forwardArgs);
    break;
  }

  case 'generate': {
    const detected = resolveStack(args[1]);
    const stack = detected || DEFAULT_STACK;
    const subArgs = detected ? args.slice(2) : args.slice(1);
    const generatorName = subArgs[0];
    const config = STACK_REGISTRY[stack];

    if (!generatorName || !config.generators[generatorName]) {
      const available = Object.entries(config.generators)
        .map(([name, g]) => `    generate ${stack} ${name} ${g.usage}`)
        .join('\n');
      console.error(`\x1b[31m[ERROR] Unknown generator "${generatorName || ''}" for stack "${stack}".\x1b[0m`);
      console.log(`\nAvailable generators:\n${available}`);
      process.exit(1);
    }

    runScript(stack, config.generators[generatorName].script, subArgs.slice(1));
    break;
  }

  case 'validate': {
    const detected = resolveStack(args[1]);
    const targetArg = detected ? args[2] : args[1];
    const stacksToValidate = [];

    if (args[1] === 'all' || (!detected && !targetArg)) {
      // Validate all registered stacks
      stacksToValidate.push(...Object.keys(STACK_REGISTRY));
    } else {
      stacksToValidate.push(detected || DEFAULT_STACK);
    }

    const validateArgs = targetArg ? [targetArg, ...args.slice(detected ? 3 : 2)] : args.slice(1);

    for (const stack of stacksToValidate) {
      const config = STACK_REGISTRY[stack];
      if (!config.validators || config.validators.length === 0) continue;

      console.log(`\x1b[1m\x1b[36m[${stack.toUpperCase()}]\x1b[0m Running validators...\n`);
      for (const v of config.validators) {
        console.log(`\x1b[36m[INFO]\x1b[0m ${v.label}...`);
        runScript(stack, v.script, validateArgs);
      }
    }

    console.log('\x1b[32m[SUCCESS] All validations passed!\x1b[0m');
    break;
  }

  default: {
    console.error(`\x1b[31m[ERROR] Unknown command: ${command}\x1b[0m`);
    console.log('Run "fluksos --help" to see all available commands.');
    process.exit(1);
  }
}
```

Key behaviors:
- **`fluksos init my-app ./dir --tier 2`** → resolves to `nextjs` (backward compat)
- **`fluksos init nextjs my-app ./dir --tier 2`** → explicit stack
- **`fluksos generate action CreateUser ./dir`** → resolves to `nextjs`
- **`fluksos generate nextjs action CreateUser ./dir`** → explicit
- **`fluksos validate ./dir`** → validates `nextjs`
- **`fluksos validate all ./dir`** → validates all registered stacks
- **`fluksos init nestjs ...`** → when `nestjs` is in STACK_REGISTRY, it works. Until then, `resolveStack` returns null, args are passed to `nextjs` as project-name. If someone passes `nestjs` literally as project name, it would try to use the nestjs stack — but since we won't add it to the registry until it's implemented, this is safe.

---

### [MODIFY] [package.json](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/package.json)

```diff
-  "description": "The Next.js Senior Stack Generator",
+  "description": "The Enterprise Stack Generator — Deterministic scaffolds for modern stacks",
   "keywords": [
     "nextjs",
+    "nestjs",
+    "postgres",
     "scaffold",
     "cli",
-    "generator"
+    "generator",
+    "enterprise",
+    "deterministic",
+    "monorepo",
+    "turborepo"
   ],
```

---

## Phase 2 — Extract `core/` (When building NestJS stack)

> [!NOTE]
> Not in scope for Phase 1. Listed here for completeness.

### [NEW] `core/helpers.js`
- Extract from [init_project.js L46-L132](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/init_project.js#L46-L132): `ensureDir`, `removeIfExists`, `writeFile`, `readJson`, `writeJson`, `mergePackageJson`, `copyFileTemplate`, `copyDirTemplate`, `assertFileExists`, `assertFileNotExists`
- Next.js scripts keep their local copies initially (gradual migration)

### [NEW] `core/report-generator.js`
- Copy of existing [report-generator.js](file:///c:/Users/pasqu/Documents/fluksosdev/pessoais/fluksos-cli/stacks/nextjs/scripts/lib/report-generator.js)

---

## Phase 3 — Separate Tier 3 DB + Postgres Scaffold

> [!NOTE]
> Not in scope for Phase 1. Listed here for completeness.

### [MODIFY] `stacks/nextjs/templates/root/docker-compose.yml`
- Remove `postgres` and `redis` services
- Keep compose as minimal shell or remove entirely

### [NEW] `stacks/postgres/`
- `templates/docker-compose.postgres.yml` — Postgres + Redis + optional pgvector
- `scripts/init_database.js` — Generates compose + drizzle config + base schema
- `scripts/generate_migration.js` — Drizzle migration scaffolder
- `scripts/validate-schema.js` — FK integrity, index checks
- Tiers to be designed later (e.g., tier 1 = Postgres only, tier 2 = + pgvector + Redis)

### Docker Compose Strategy (Senior Pattern)
Each stack provides a **compose fragment**. The `init` command merges active fragments into a single root `docker-compose.yml`:

```bash
# User runs:
fluksos init nextjs my-app ./my-app --tier 2
fluksos init postgres my-app ./my-app

# CLI generates:
# ./my-app/docker-compose.yml ← merged from nextjs + postgres fragments
# User just runs: docker compose up
```

---

## Phase 4 — NestJS Scaffold

> [!NOTE]
> Not in scope for Phase 1. Listed here for completeness.

### Architecture
- Fastify as HTTP adapter (primary)
- Hono for **edge functions only** (complementary, not a Fastify replacement)
- All within the same turborepo: `apps/api/`

### [NEW] `stacks/nestjs/`
- `scripts/init_project.js` — Scaffolds `apps/api/` in existing turborepo workspace
- `scripts/generate_controller.js`
- `scripts/generate_service.js`
- `scripts/generate_guard.js`
- `scripts/validate-architecture.js` — Module structure, decorator rules, guard enforcement
- Tiers to be designed later

---

## Verification Plan

### Automated Tests (Phase 1)
```bash
# Existing tests MUST pass without any changes
cd stacks/nextjs/scripts && npx vitest run

# Manual smoke tests for new CLI router
node bin/cli.js --help
node bin/cli.js init my-app ./tmp/test1 --tier 1 --no-install --no-git
node bin/cli.js init nextjs my-app ./tmp/test2 --tier 1 --no-install --no-git
node bin/cli.js generate action TestAction ./tmp/test-actions
node bin/cli.js generate nextjs action TestAction ./tmp/test-actions2
node bin/cli.js validate nextjs ./tmp/test1
```

### Manual Verification Checklist
- [ ] `fluksos --help` displays available stacks and all commands
- [ ] `fluksos init my-app ./dir --tier 1 --no-install --no-git` works identically to before
- [ ] `fluksos init nextjs my-app ./dir --tier 1 --no-install --no-git` works identically
- [ ] `fluksos generate action Test ./dir` works identically
- [ ] `fluksos generate nextjs action Test ./dir` works identically
- [ ] `fluksos validate ./dir` works identically
- [ ] `fluksos validate nextjs ./dir` works identically
- [ ] `fluksos validate all ./dir` runs all registered stack validators
- [ ] Unknown stack shows clear error with available stacks list
- [ ] Unknown generator shows clear error with available generators for that stack
