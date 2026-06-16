import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/config/env";

/**
 * Enterprise Rate Limiting configuration.
 * Uses Upstash Redis to prevent brute-force attacks and spam.
 * 
 * Graceful Degradation: If Upstash keys are not found in .env, it bypasses the rate limit.
 * This ensures the application runs seamlessly in local development without mandatory cloud accounts.
 */

// Create a dummy limiter for graceful fallback
const dummyLimiter = {
  limit: async () => ({ success: true, pending: Promise.resolve() }),
};

export const rateLimit = env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: true,
      /**
       * Optional prefix for the keys used in redis. This is useful if you want to share a redis
       * instance with other applications and want to avoid key collisions. The default prefix is
       * "@upstash/ratelimit"
       */
      prefix: "@upstash/ratelimit",
    })
  : dummyLimiter;

export function checkRateLimitWarning() {
  if (!env.UPSTASH_REDIS_REST_URL && env.NODE_ENV === "development") {
    console.warn("🛡️ [Security] Upstash Rate Limiter is disabled. Add UPSTASH_REDIS_REST_URL to .env to enable.");
  }
}
