# Server Actions

This directory contains all Next.js Server Actions for the application.

## 📐 Conventions & Rules

1. **Always use Safe Actions**: Do not write raw Next.js server actions. Always use the `actionClient` exported from `@/lib/safe-action` to ensure type-safety, validation, and proper error handling.
2. **File Naming**: Name your files based on the domain or entity they operate on (e.g., `user.actions.ts`, `billing.actions.ts`).
3. **Use Valibot**: All input validation must be done using Valibot schemas, consistent with the rest of the application.
4. **Server Only**: Server actions must always start with the `'use server'` directive at the top of the file.

## 💡 Example

```typescript
'use server';

import * as v from 'valibot';
import { actionClient } from '@/lib/safe-action';
import { db } from '@/db';

// 1. Define the input schema using Valibot
const UpdateProfileSchema = v.object({
  name: v.string([v.minLength(2, 'Name is too short')]),
  email: v.string([v.email('Invalid email')]),
});

// 2. Create the action using the safe client
export const updateProfile = actionClient
  .schema(UpdateProfileSchema)
  .action(async ({ parsedInput }) => {
    // Input is already validated and fully typed!
    const { name, email } = parsedInput;

    try {
      // Perform database operations safely
      const result = await db.updateUser({ name, email });
      
      // Return serializable data to the client
      return { success: true, user: result };
    } catch (error) {
      // Errors are automatically caught by handleServerError in safe-action.ts
      throw new Error('Failed to update profile');
    }
  });
```

## 🔗 Client Usage

In your React components, use the `useAction` hook from `next-safe-action/react` to call these actions with loading states and typed responses.

```tsx
'use client';

import { useAction } from 'next-safe-action/react';
import { updateProfile } from '@/actions/user.actions';

export function ProfileForm() {
  const { execute, isExecuting, result } = useAction(updateProfile);

  return (
    <button 
      onClick={() => execute({ name: 'John', email: 'john@example.com' })}
      disabled={isExecuting}
    >
      {isExecuting ? 'Saving...' : 'Save Profile'}
    </button>
  );
}
```
