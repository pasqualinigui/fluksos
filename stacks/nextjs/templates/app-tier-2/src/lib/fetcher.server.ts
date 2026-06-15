import 'server-only'

type FetcherOptions = Omit<RequestInit, 'method'> & {
  timeout?: number
}

class FetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
  ) {
    super(message)
    this.name = 'FetchError'
  }
}

const DEFAULT_TIMEOUT = 10_000

async function fetcher<T>(
  url: string | URL,
  options: FetcherOptions = {},
): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...init } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new FetchError(
        `Fetch failed: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText,
      )
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timeoutId)
  }
}

export { fetcher, FetchError }
export type { FetcherOptions }
