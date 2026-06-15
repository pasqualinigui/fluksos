import { createSafeActionClient } from 'next-safe-action'
import { valibotAdapter } from 'next-safe-action/adapters/valibot'

export const actionClient = createSafeActionClient({
  validationAdapter: valibotAdapter(),
  handleServerError(error) {
    console.error('Action error:', error.message)

    return error.message
  },
})
