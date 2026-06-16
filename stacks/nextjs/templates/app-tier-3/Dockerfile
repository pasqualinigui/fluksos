# Usa Alpine para máxima redução de tamanho
FROM node:22-alpine AS base

# Fase de Dependências
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
# Ativa pnpm
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Fase de Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Desativa telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# Fase de Execução (Production)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Configura um usuário não-root (Segurança Senior)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia a pasta public
COPY --from=builder /app/public ./public

# Copia os arquivos gerados em modo standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Executa o server customizado gerado pelo modo standalone
CMD ["node", "server.js"]
