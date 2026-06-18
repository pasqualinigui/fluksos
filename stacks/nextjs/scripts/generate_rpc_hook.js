#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const [, , hookName, targetDir] = process.argv

if (!hookName || !targetDir) {
  console.error(
    '\x1b[31m[ERROR]\x1b[0m Usage: node generate_rpc_hook.js <EntityName> <target-directory>',
  )
  process.exit(1)
}

const fileName = `use-${hookName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, '')}.ts`
const absoluteTargetDir = path.resolve(targetDir)
const filePath = path.join(absoluteTargetDir, fileName)

const content = `import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Assume the Hono RPC client is exported from @/lib/rpc-client
import { rpc } from "@/lib/rpc-client"; 

/**
 * [WARNING] GOLDEN RULE: NEVER USE THE HONO CLIENT DIRECTLY IN COMPONENTS.
 * ALWAYS WRAP IT IN TANSTACK QUERY LIKE THIS FILE DOES.
 */

// Example Query Hook (Read/GET)
export function useGet${hookName}(id: string) {
  return useQuery({
    queryKey: ['${hookName.toLowerCase()}', id],
    queryFn: async () => {
      // Example of an end-to-end typed RPC call
      const res = await rpc.api.${hookName.toLowerCase()}[':id'].$get({ param: { id } });
      
      if (!res.ok) {
        throw new Error("Failed to fetch data from Hono RPC");
      }
      return res.json();
    },
  });
}

// Example Mutation Hook (Write/POST)
export function useCreate${hookName}() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => { // Replace 'any' with the type inferred from Hono
      const res = await rpc.api.${hookName.toLowerCase()}.$post({ json: data });
      
      if (!res.ok) {
        throw new Error("Failed to create record in Hono RPC");
      }
      return res.json();
    },
    onSuccess: () => {
      // Automatically invalidate the cache so the UI re-renders with the new data
      queryClient.invalidateQueries({ queryKey: ['${hookName.toLowerCase()}'] });
    },
  });
}
`

if (!fs.existsSync(absoluteTargetDir)) {
  fs.mkdirSync(absoluteTargetDir, { recursive: true })
}

fs.writeFileSync(filePath, content)
console.log(
  `\x1b[32m[SUCCESS]\x1b[0m Hono RPC Wrapper Hook 'use${hookName}' generated successfully at: ${filePath}`,
)
