'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { faro } from '@grafana/faro-web-sdk'

export default function GlobalError({
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
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 p-6 text-center dark:bg-gray-950">
          <div className="flex flex-col items-center gap-6 max-w-lg rounded-xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-full bg-amber-100 p-4 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Fatal Application Error
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400">
                The application encountered an unrecoverable error. We apologize for the inconvenience. 
                Our engineering team has received an automated report containing the stack trace.
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col sm:flex-row gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
              >
                <RotateCcw className="h-4 w-4" />
                Reload Application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
