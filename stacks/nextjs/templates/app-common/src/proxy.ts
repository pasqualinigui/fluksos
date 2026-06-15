import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Add middleware logic here if needed
  return NextResponse.next();
}
