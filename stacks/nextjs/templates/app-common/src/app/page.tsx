export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-6 py-16">
      <section className="max-w-2xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          NomeDoProduto
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Uma base moderna para o seu app Next.js.
        </h1>

        <p className="text-lg leading-8 text-muted-foreground">
          Estrutura inicial com Tailwind v4, App Router, tipagem forte, SEO nativo e padrões prontos
          para evoluir com segurança.
        </p>
      </section>
    </main>
  );
}
