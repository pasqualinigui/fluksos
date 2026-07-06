import { createSafeActionClient } from 'next-safe-action'
import { valibotAdapter } from 'next-safe-action/adapters/valibot'
import { headers } from 'next/headers'
import { rateLimit, checkRateLimitWarning } from './rate-limit'
import { auth } from './auth'

checkRateLimitWarning()

export const actionClient = createSafeActionClient({
  validationAdapter: valibotAdapter(),
  handleServerError(error) {
    console.error('Action error:', error.message)

    return error.message
  },
}).use(async ({ next }) => {
  const reqHeaders = headers()
  const ip = reqHeaders.get('x-forwarded-for') ?? '127.0.0.1'
  
  // 1. Fetch current session from Better Auth
  const session = await auth.api.getSession({
    headers: reqHeaders
  })
  
  // 2. Hybrid Rate Limit: Protect by Account (UserId) if logged in, fallback to IP if anonymous
  const identifier = session?.user?.id ?? ip
  
  const { success } = await rateLimit.limit(identifier)
  
  if (!success) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }
  
  // 3. Inject session into context so actions don't need to re-fetch it
  return next({
    ctx: {
      session,
      ip
    }
  })
})
