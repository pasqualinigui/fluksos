---
"fluksos": patch
---

- **Generators Integrity:** Hardened CLI generators (`generate_action`, `generate_rpc_hook`, `generate_schema`) against path traversal vulnerabilities by enforcing strict alphanumeric validation for entity names.
- **Safety:** Implemented idempotency checks on code generation. The generators will now exit with a safe error message if the target file already exists, preventing accidental code overwrites or data loss during development.
