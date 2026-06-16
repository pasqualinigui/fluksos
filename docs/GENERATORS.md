---
description: Code Generators and the Golden Rules of Architecture
audience: End Users, Developers
---

# 🛠️ Code Generators & The Golden Rules

Fluksos doesn't just scaffold a project and abandon you. It acts as an active assistant during your development process via the `generate` command.

The generators are designed to prevent boilerplate fatigue while **enforcing strict architectural standards**. If you write code manually, you might make a mistake. If you use the generator, you are guaranteed to write "Senior-level" code.

---

## 1. Server Actions (`generate action`)

**Command:**
```bash
fluksos generate nextjs action <ActionName> <target-dir>
# Example: fluksos generate nextjs action CreateUser ./src/actions
```

### What it does:
Generates a type-safe Server Action using `next-safe-action` and `valibot`.

### 🥇 The Golden Rule: Never Trust the Client
A common mistake in Next.js is writing a raw async function for a Server Action and trusting the arguments. 
Fluksos generates an action that **requires** a Valibot schema. The execution will automatically fail and return type-safe errors to the frontend if the payload doesn't perfectly match the schema.

```typescript
// Auto-generated example
const CreateUserSchema = v.object({ id: v.string() });

export const CreateUserAction = actionClient
  .schema(CreateUserSchema)
  .action(async ({ parsedInput: { id } }) => {
    // 100% safe to use 'id' here
    return { success: true };
  });
```

---

## 2. Hono RPC Hooks (`generate rpc`)

**Command:**
```bash
fluksos generate nextjs rpc <HookName> <target-dir>
# Example: fluksos generate nextjs rpc useUserProfile ./src/hooks
```

### What it does:
Generates a React Hook that wraps the **Hono RPC Client** inside **TanStack Query** (`useQuery` / `useMutation`).

### 🥇 The Golden Rule: Never call the RPC Client directly in components
Hono RPC is fantastic for end-to-end type safety across the Edge. However, calling `await rpc.api.users.$get()` directly inside a `useEffect` or an `onClick` handler is terrible architecture. It breaks React's concurrent mode, ruins caching, and causes race conditions.

Fluksos forces you into the optimal pattern: **Data fetching belongs in TanStack Query.**

```typescript
// Auto-generated hook ensures you get:
// 1. Loading states (isLoading)
// 2. Cache invalidation on mutation (queryClient.invalidateQueries)
// 3. End-to-end type safety from Hono
export function useCreateUserProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => { 
      const res = await rpc.api.userprofile.$post({ json: data });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userprofile'] });
    },
  });
}
```

By relying on these generators, your team will naturally fall into the Pit of Success.
