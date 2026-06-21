---
"fluksos": patch
---

- **Bugfix:** Fixed `create-next-app` silent failure on Windows caused by incorrect alias quoting. The global `runCommand` executor now correctly respects `shell: true` on Windows, ensuring arguments are passed safely without path corruption.
