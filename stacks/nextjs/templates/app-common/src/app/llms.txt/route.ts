export function GET() {
  const content = `# NomeDoProduto

> Descrição concisa e factual da aplicação para mecanismos de resposta por IA.

## Documentação

- [Docs](/docs): Documentação principal do produto
- [API](/docs/api): Referência da API
- [Changelog](/changelog): Histórico de alterações

## Contato

- Site: https://dominio.com
- GitHub: https://github.com/usuario/repositorio
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
