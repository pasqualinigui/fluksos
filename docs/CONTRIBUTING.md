# Contributing to Fluksos

Thank you for your interest in contributing to Fluksos! Fluksos is a high-level Enterprise generator, meaning our code must be as strict and deterministic as the code we generate for our users.

## Local Setup

To develop locally, you **must** use `pnpm` (version 11+).

1. Clone the repository and install dependencies:
```bash
pnpm install
```

2. **Required**: Install the local Git hooks. We use Lefthook to run Biome (Linter/Formatter) and Vitest before you can commit or push code.
```bash
pnpm exec lefthook install
```

## Governance & Tooling

We practice **Dogfooding**. The repository itself is governed by strict rules:

- **Biome**: Handles all our formatting and linting for `bin/` and `stacks/*/scripts/`.
- **Vitest**: Runs our architectural validation tests.
- **Lefthook**: Enforces these checks locally on `pre-commit` and `pre-push`.
- **GitHub Actions**: Enforces these checks on all Pull Requests.

> **Note on Templates**: The `stacks/*/templates/` and `stacks/*/tests/mock-project/` directories are intentionally ignored by Biome. These folders contain the raw output code sent to users, which may include intentional syntax gaps or template logic. **Do not attempt to format them globally.**
