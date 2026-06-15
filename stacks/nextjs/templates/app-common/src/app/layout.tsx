import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: {
    default: 'NomeDoProduto',
    template: '%s | NomeDoProduto'
  },
  description:
    'Descrição concisa e factual da aplicação para crawlers tradicionais e mecanismos de resposta por IA.',
  applicationName: 'NomeDoProduto',
  metadataBase: new URL('https://dominio.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: 'https://dominio.com',
    siteName: 'NomeDoProduto',
    title: 'NomeDoProduto',
    description:
      'Descrição concisa e factual da aplicação para crawlers tradicionais e mecanismos de resposta por IA.',
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NomeDoProduto',
    description:
      'Descrição concisa e factual da aplicação para crawlers tradicionais e mecanismos de resposta por IA.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
