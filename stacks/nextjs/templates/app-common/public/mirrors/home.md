# Welcome to Your New Application

This is a mirror markdown file served from the `public/mirrors/` directory. It can be fetched by your application to render static markdown content, blog posts, or dynamic documentation pages without requiring a database.

## Features at a Glance

- **Blazing Fast**: Served statically via Next.js public directory.
- **Markdown Ready**: Can be easily parsed and rendered using libraries like `react-markdown`.
- **SEO Friendly**: Content can be rendered server-side (SSR) or statically generated (SSG).

## How to Use This File

You can fetch this file from any Server or Client Component:

```typescript
// Example: Fetching markdown content in a Server Component
export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/mirrors/home.md`);
  const markdown = await res.text();
  
  return (
    <article>
      {/* Render markdown here */}
    </article>
  );
}
```

> **Tip**: Keep your markdown files organized in folders within `public/mirrors/` to easily map them to your application routes.
