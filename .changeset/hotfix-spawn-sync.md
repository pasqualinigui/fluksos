---
\
fluksos\: patch
---

- **Bugfix:** Fixed an issue where the CLI falsely reported \pnpm\ as uninstalled on Windows environments. The \spawnSync\ command now properly utilizes \shell: true\ on Windows, resolving the \EINVAL\ error when verifying preconditions.
