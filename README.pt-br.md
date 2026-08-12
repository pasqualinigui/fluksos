<div align="center">
  <br />
  <h1>🚀 FLUKSOS</h1>
  <p><b>A Engine de Scaffolding Top 1% Sênior para Aplicações Web Enterprise</b></p>
  <br />
</div>

> **Fluksos** não é apenas mais uma CLI. É uma engine determinística desenhada para gerar monorepos ultra-modernos e blindados em Next.js com zero alucinação. Construída para Engenheiros Seniores e Staff Engineers que exigem perfeição arquitetural desde o dia zero.

---

## 🌟 Por que Fluksos? O Diferencial "Top 1%"

A maioria dos geradores te entrega um `create-next-app` básico e deixa a parte difícil com você. O Fluksos entrega um ecossistema pronto para escalar para milhões de requisições, embutindo as melhores práticas da indústria em três níveis distintos de infraestrutura.

### 🛡️ Segurança Inflexível & CI/CD
- **Traefik Edge Proxy**: Proxy nativo Traefik v3 atuando como API Gateway, protegendo seu servidor Node.js contra ataques de força bruta.
- **DAST & SCA Automatizados**: GitHub Actions pré-configuradas para **OWASP ZAP** (Dynamic Application Security Testing) e **Trivy** (Container Vulnerability Scanning).
- **Configurações Blindadas**: Content-Security-Policies (CSP) estritas, HSTS e rate-limiting implementados nativamente.

### 📊 Observabilidade Enterprise (Stack LGTM)
- **Telemetria Zero-Config**: O Tier 3 vem com uma stack completa de observabilidade Docker Compose movida pelo Grafana Alloy.
- **Traces, Métricas, Logs**: Integração perfeita com Prometheus, Loki e Tempo via OpenTelemetry.
- **Profiling Contínuo**: Grafana Pyroscope habilitado por padrão para identificação granular de gargalos de CPU/Memória.

### ⚡ Performance Extrema
- **Redis TCP vs HTTP**: Abandonamos abstrações serverless lentas em favor de um Redis TCP bare-metal (ioredis) para cache sub-milissegundo e rate limiting em produção.
- **Teste de Carga K6**: Scripts de performance K6 pré-escritos usando a nova API de Assertion v2.0+ para validar seus limites de tráfego.

### 🤖 Otimização para IA (AEO)
- Rotas API `llms.txt` e `/llms-full.txt` integradas para garantir que crawlers de LLM (como ChatGPT, Claude e Perplexity) indexem sua aplicação perfeitamente.
- HTML semântico e textos alternativos (Alt) impostos estritamente no momento do scaffolding.

---

## 🏗️ Os 3 Tiers de Arquitetura

O Fluksos permite que você crie a base do seu projeto dependendo da sua estratégia de deploy:

### **Tier 1: Minimalista (Edge)**
Perfeito para deploys na Vercel/Netlify. Puramente Next.js App Router, Tailwind v4 e Biome. Sem dependências pesadas de backend.

### **Tier 2: Escala Serverless**
Introduz Zustand (estado isolado de UI) e Valibot. Pronto para arquiteturas serverless com geração básica de rotas API.

### **Tier 3: Container Native (O Padrão Enterprise)**
Um ambiente totalmente dockerizado. Inclui:
- Next.js rodando em um container Node Alpine ultra-leve.
- PostgreSQL + pgvector para workloads de Inteligência Artificial.
- Drizzle ORM com scripts automatizados de migração via CI/CD (`migrate.ts`).
- Container Redis TCP para rate-limiting de alta velocidade.
- Traefik API Gateway.
- Stack Completa de Observabilidade LGTM.

---

## 🚀 Início Rápido

Certifique-se de ter Node.js 20+ e `pnpm` instalados.

```bash
# Gere um novo Workspace Enterprise Tier 3
npx fluksos@latest init nextjs meu-app ./meu-app --tier 3
```

> **Nota**: O Fluksos exige o uso exclusivo do `pnpm` para a configuração estrita do Turborepo.

---

## 🛠️ O Ecossistema Fluksos

### Geração de Código
Nunca mais escreva boilerplate de Server Actions ou hooks RPC manualmente. O Fluksos mantém limites arquiteturais estritos:

```bash
npx fluksos@latest generate action
npx fluksos@latest generate rpc-hook
```

### Validação Contínua
O Fluksos inclui um parser AST customizado para impor regras que os linters padrão deixam passar (ex: banir `createContext`, forçar limites `server-only`).

```bash
npx fluksos@latest validate
```

---

## 📚 Documentação

Para contribuidores internos e agentes de IA trabalhando nesta CLI, consultem estritamente o [AGENTS.md](./AGENTS.md).

## 🤝 Contribuindo
Todas as Pull Requests devem passar nas rigorosas validações de arquitetura do Vitest. Veja `.github/PULL_REQUEST_TEMPLATE.md` para diretrizes.

## 📄 Licença
MIT © Fluksos
