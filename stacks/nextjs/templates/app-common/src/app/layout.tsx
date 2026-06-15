import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: {
		default: "ProductName",
		template: "%s | ProductName",
	},
	description:
		"A concise and factual description of the application for traditional crawlers and AI-powered response mechanisms.",
	applicationName: "ProductName",
	metadataBase: new URL("https://domain.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: "https://domain.com",
		siteName: "ProductName",
		title: "ProductName",
		description:
			"A concise and factual description of the application for traditional crawlers and AI-powered response mechanisms.",
		locale: "pt_BR",
	},
	twitter: {
		card: "summary_large_image",
		title: "ProductName",
		description:
			"A concise and factual description of the application for traditional crawlers and AI-powered response mechanisms.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
