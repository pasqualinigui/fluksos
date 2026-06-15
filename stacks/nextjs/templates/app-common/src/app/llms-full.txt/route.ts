export function GET() {
  const content = `# NomeDoProduto

> Descrição concisa e factual da aplicação para mecanismos de resposta por IA.

## Sobre

NomeDoProduto é uma aplicação web moderna construída com Next.js.
Aqui você pode descrever em detalhes o que o produto faz, para quem ele serve,
e quais problemas ele resolve.

## Funcionalidades Principais

### Funcionalidade 1
Descrição detalhada da funcionalidade principal do produto.

### Funcionalidade 2
Descrição detalhada da segunda funcionalidade.

## Documentação

- [Docs](/docs): Documentação principal do produto
- [API](/docs/api): Referência completa da API
- [Guia de Início Rápido](/docs/quickstart): Como começar a usar
- [Changelog](/changelog): Histórico de alterações
- [FAQ](/docs/faq): Perguntas frequentes

## Stack Técnica

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Autenticação**: Better Auth
- **Observabilidade**: OpenTelemetry + Sentry

## API

Base URL: \`https://dominio.com/api\`

### Endpoints Públicos
- \`GET /api/health\` — Status da aplicação
- \`GET /api/docs\` — Documentação da API

## Contato

- Site: https://dominio.com
- GitHub: https://github.com/usuario/repositorio
- Email: contato@dominio.com

## Licença

MIT
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
