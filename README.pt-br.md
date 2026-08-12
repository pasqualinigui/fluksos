<div align="center">
  <br />
  <h1>🚀 FLUKSOS</h1>
  <p><b>A Engine de Platform Engineering Top 1% Sênior</b></p>
  <br />
</div>

> **Fluksos** não é um simples gerador de boilerplate Next.js. É uma **Engine de Platform Engineering** determinística desenhada para gerar arquiteturas ultra-modernas e blindadas para produção em múltiplas tech stacks, com zero alucinação. Construída para Engenheiros Seniores e Staff Engineers que exigem perfeição arquitetural desde o dia zero.

---

## 🌟 Por que Fluksos? O Diferencial "Top 1%"

A maioria dos geradores te entrega um kit inicial básico e deixa a parte difícil com você. O Fluksos entrega um ecossistema pronto para escalar para milhões de requisições, embutindo as melhores práticas da indústria em infraestrutura, segurança e observabilidade.

### 🛡️ Segurança Inflexível & CI/CD
- **DAST & SCA Automatizados**: GitHub Actions pré-configuradas para **OWASP ZAP** (Dynamic Application Security Testing) e **Trivy** (Container Vulnerability Scanning).
- **Edge Proxies & Rate Limiting**: Proxy nativo Traefik v3 atuando como API Gateway, protegendo seus servidores contra ataques de força bruta.
- **Configurações Blindadas**: Content-Security-Policies (CSP) estritas, HSTS e rate-limiting implementados nativamente.

### 📊 Observabilidade Enterprise (Stack LGTM)
- **Telemetria Zero-Config**: Os scaffolds já vêm com uma stack completa de observabilidade Docker Compose movida pelo Grafana Alloy.
- **Traces, Métricas, Logs**: Integração perfeita com Prometheus, Loki e Tempo via OpenTelemetry.
- **Profiling Contínuo**: Grafana Pyroscope habilitado por padrão para identificação granular de gargalos de CPU/Memória.

### 🧠 Tribunal de Validação AST
- **Governança Proativa**: O Fluksos inclui um parser AST customizado baseado em regex (`ast-parser.js`) que roda durante os hooks de pre-commit via Lefthook.
- **Limites Estritos**: Bane automaticamente anti-patterns (ex: usar `createContext` quando Zustand é exigido, `redux`, ausência da diretiva `server-only`) antes mesmo de chegarem em um Pull Request.

---

## 📚 Stacks Disponíveis & Roadmap

O Fluksos foi projetado para ser uma engine multi-stack. Cada stack traz seu próprio conjunto de geradores, validadores e níveis arquiteturais (tiers).

| Stack | Status | Descrição |
| :--- | :--- | :--- |
| **`nextjs`** | 🟢 **Disponível** | Next.js 15+ App Router, Turbopack, Biome, Tailwind v4, Drizzle ORM, AEO |
| **`react-vite`** | 🟡 **Roadmap** | SPAs ultrarrápidas, Dashboards Administrativos Internos, React Query, Zustand |
| **`nestjs`** | 🟡 **Roadmap** | Microserviços de backend corporativos impulsionados por Fastify e arquitetura DDD |

---

## 🚀 Início Rápido (Flagship Next.js)

Certifique-se de ter Node.js 20+ e `pnpm` instalados.

```bash
# Gere um novo Workspace Enterprise Tier 3 para Next.js
npx fluksos@latest init nextjs meu-app ./meu-app --tier 3
```

> **Nota**: O Fluksos exige o uso exclusivo do `pnpm` para a configuração estrita do Turborepo.

### Os 3 Tiers de Arquitetura (Exemplo Next.js)

- **Tier 1: Minimalista (Edge)** — Puramente Next.js App Router, Tailwind v4 e Biome. Sem dependências pesadas de backend.
- **Tier 2: Escala Serverless** — Introduz Zustand (estado isolado de UI) e Valibot. Pronto para arquiteturas serverless com Upstash Rate Limiting.
- **Tier 3: Container Native** — Ambiente totalmente dockerizado com PostgreSQL (pgvector), migrações CI/CD Drizzle, Redis TCP, Traefik, e a Stack Completa de Observabilidade LGTM.

---

## 🛠️ O Ecossistema Fluksos

### Geração de Código
Nunca mais escreva boilerplate manualmente. O Fluksos mantém limites estritos via geradores:

```bash
npx fluksos@latest generate nextjs action CreateUser ./src/actions
npx fluksos@latest generate nextjs rpc-hook useUser ./src/hooks
```

### Validação Contínua
Rode o tribunal de validação AST contra a base de código existente para garantir integridade arquitetural:

```bash
npx fluksos@latest validate all ./meu-app
```

---

## 📖 Documentação Interna

Para contribuidores internos e agentes de IA trabalhando nesta CLI, consultem estritamente o [AGENTS.md](./AGENTS.md).

## 🤝 Contribuindo
Todas as Pull Requests devem passar nas rigorosas validações de arquitetura do Vitest. A engine Fluksos usa um fixture de projeto mockado para rodar testes de integração contra os próprios arquivos que ela gera. Veja `.github/PULL_REQUEST_TEMPLATE.md` para diretrizes.

## 📄 Licença
MIT © Fluksos
