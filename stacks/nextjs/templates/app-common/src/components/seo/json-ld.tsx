interface JsonLdProps {
  readonly data: Record<string, unknown> & { '@context': string; '@type': string };
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
