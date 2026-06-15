export async function setupMocks() {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof window === 'undefined') {
      const { server } = await import('@/mocks/server');
      server.listen({ onUnhandledRequest: 'bypass' });
    } else {
      const { worker } = await import('@/mocks/browser');
      await worker.start({ onUnhandledRequest: 'bypass' });
    }
  }
}
