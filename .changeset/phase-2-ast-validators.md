---
"fluksos": patch
---

- **AST Engine Performance & Security:** Fixed ReDoS (Catastrophic Backtracking) vulnerabilities in `ast-parser.js` by optimizing greedy regex patterns to possessive equivalents.
- **AST False Positives:** Implemented a pre-processor to strip single and multi-line comments from `.js/.ts` files before AST analysis, preventing commented-out code from triggering architectural violations.
- **I/O Resilience:** Refactored the internal `walk` directory functions in validators to catch and ignore `EACCES` and `ENOENT` filesystem errors instead of crashing, and implemented loop-detection to prevent infinite recursion on symlinks.
- **Config Validations:** Fixed a silent bug in `validate-config.js` where malformed `package.json` or `components.json` files would fail silently and pass validation. Malformed JSON will now correctly emit a `FATAL` error.
