import type { ReactNode } from 'react';

/**
 * Common Provider Wrapper.
 * This is a pass-through component for Tier 1 and Tier 2.
 * In Tier 3, this file is automatically overwritten by the scaffold engine
 * with a full React Query Provider implementation.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
