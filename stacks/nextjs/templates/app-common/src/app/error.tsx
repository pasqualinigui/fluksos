'use client'

import { useEffect } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { faro } from '@grafana/faro-web-sdk'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for local dev
    console.error(error)
    
    // Log error to Observability stack (Tier 3) if Faro is initialized
    if (faro?.api) {
      faro.api.pushError(error)
    }
  }, [error])

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-4 max-w-md rounded-lg border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/50 dark:text-red-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-red-900 dark:text-red-400">
            Something went wrong!
          </h2>
          <p className="text-sm text-red-700 dark:text-red-300/80">
            An unexpected error occurred while rendering this component. Our team has been notified.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  )
}
