import { createSafeActionClient } from 'next-safe-action'
import { valibotAdapter } from 'next-safe-action/adapters/valibot'
import { headers } from 'next/headers'
import { rateLimit, checkRateLimitWarning } from './rate-limit'

checkRateLimitWarning()

export const actionClient = createSafeActionClient({
  validationAdapter: valibotAdapter(),
  handleServerError(error) {
    console.error('Action error:', error.message)

    return error.message
  },
}).use(async ({ next }) => {
  const ip = headers().get('x-forwarded-for') ?? '127.0.0.1'
  
  const { success } = await rateLimit.limit(ip)
  
  if (!success) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }
  
  return next()
})
