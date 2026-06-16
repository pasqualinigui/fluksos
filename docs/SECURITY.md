---
description: Security Defaults and Rate Limiting Architecture
audience: End Users, Developers
---

# 🛡️ Security & Rate Limiting

The modern web is aggressive. If you ship a login form without a Rate Limiter, you will face brute-force attacks. If you ship an app without proper CSP headers, you are vulnerable to XSS and Clickjacking.

Fluksos builds **Zero-Day Security** directly into the scaffold, solving enterprise compliance headaches automatically.

---

## 1. Upstash Rate Limiting (The Shield)

In Tier 2 and Tier 3 projects, we inject `@upstash/ratelimit` and `@upstash/redis`. 
The rate limiter is pre-configured and attached to your Server Actions via the `safe-action.ts` interceptor.

### How it works:
Every mutation (POST, PUT, DELETE) hitting a Server Action is evaluated against the Redis counter *before* executing the business logic.

**Default Configuration:**
- Limit: 10 requests.
- Window: Every 10 seconds.
- Identifier: The user's IP Address (extracted automatically via headers).

### Graceful Degradation
Fluksos adheres to "Fail-Fast" architecture but respects developer experience. If you forget to provide the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your environment variables, the app **will not crash**. The rate limiter gracefully bypasses itself, printing a console warning in development so you know you are unprotected, but allowing you to continue coding locally without an internet dependency.

---

## 2. Strict Security Headers

A massive vulnerability in single-page apps is the lack of HTTP response headers. Fluksos injects a strict security policy directly into `next.config.ts`.

### Headers Applied:
- **X-Frame-Options (DENY):** Prevents other websites from embedding your app in an `<iframe>`, eliminating Clickjacking attacks.
- **X-Content-Type-Options (nosniff):** Prevents browsers from guessing the MIME type, preventing malicious file execution.
- **Strict-Transport-Security (HSTS):** Forces browsers to only connect via HTTPS (max-age=63072000).
- **Content-Security-Policy (CSP):** A highly calibrated policy. It blocks unauthorized external scripts and iframes but explicitly allows `self` and `unsafe-inline` scripts locally to ensure Next.js Fast Refresh and TailwindCSS function correctly without throwing red console errors during development.

---

## 3. Better Auth & Drizzle ORM

If you deploy a Tier 3 application, your authentication is handled by **Better Auth**.

- **Enforced Email Verification:** An AST rule ensures that `requireEmailVerification` is set to `true`. You cannot disable it without explicitly overriding the Fluksos validation engine.
- **SQL Injection Prevention:** `drizzle-orm` natively sanitizes all inputs. Combined with Valibot's schema parsing in the Server Actions, malicious payloads are dropped before they ever reach the ORM layer.
