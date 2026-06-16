---
description: The Fluksos Validation Engine and AST Rules
audience: End Users, Developers
---

# 🛡️ Validators & The AST Parser

The biggest problem with software teams is entropy: the architecture rots over time as developers cut corners. 

Fluksos solves this by shipping with a custom, lightning-fast **AST Validation Engine**. It isn't just a linter; it's an architectural tribunal that enforces boundaries.

---

## 1. How It Works

**Command:**
```bash
fluksos validate nextjs ./target-dir
```

When triggered, the CLI reads your entire source code directory. Instead of booting up a heavy TypeScript compiler, it uses a highly-tuned **Regex-based AST Parser** (`ast-parser.js`) to scan your `.ts`, `.tsx`, and `.css` files for forbidden patterns.

If it finds a violation, the `report-generator.js` kicks in, prints a beautiful summary of the "crimes" committed, and exits with code `1` (FATAL).

---

## 2. CI/CD & Lefthook Integration

Fluksos automatically installs and configures `lefthook` (a fast Git hooks manager). 

Every time a developer types `git commit`, Lefthook automatically runs `fluksos validate nextjs .`.
If an architectural boundary is broken, the commit is **blocked locally**. Bad code never even reaches GitHub, saving hundreds of hours in code reviews.

---

## 3. The Rules Catalogue

Here is a subset of the architectural rules enforced strictly by Fluksos. These rules define the "Senior-level" standards of the stack.

### FATAL Violations (Blocks Commits)
- **`banned-axios`**: `axios` is banned. Use the native `fetch` API or the Hono RPC client.
- **`banned-redux` / `banned-react-context`**: Redux and React Context are banned for global state. Use Zustand.
- **`banned-pages-router`**: The old `src/pages/` directory is banned. Only the App Router (`src/app/`) is allowed.
- **`banned-custom-primitive-ui`**: Do not build custom UI primitives (Button, Input, Modal) from scratch. Use the pre-configured Shadcn UI components.
- **`missing-server-only`**: Security rule. Any file in `src/db/`, `src/actions/`, or `src/services/` MUST import the `server-only` package at the top to prevent accidental client-side leaks of database secrets.
- **`db-in-client-component`**: It is strictly forbidden to import the `db` instance inside a `"use client"` file.
- **`use-client-in-page`**: Your `page.tsx` MUST be a Server Component. You cannot add `"use client"` to the top-level route boundary.
- **`banned-csr-fetch`**: Calling `fetch()` inside a `useEffect` is an anti-pattern. You must use TanStack Query or Server Components.
- **`missing-alt-text`**: Accessibility matters. `<img>` and `<Image>` tags must have descriptive `alt` attributes.
- **`css-import-url`**: Performance rule. Using `@import url()` in your CSS blocks parallel downloads. You must use `next/font`.

### ERROR Violations (Warnings)
- **`business-logic-in-page`**: Route handlers and mutations inside `page.tsx` are discouraged. Keep pages focused on layout and data fetching, offload mutations to Server Actions.
- **`missing-opengraph-image`**: Marketing pages (`page.tsx`) should ideally have a co-located `opengraph-image.*` for rich social sharing.

*Fluksos plays the bad cop, so your Tech Lead doesn't have to.*
