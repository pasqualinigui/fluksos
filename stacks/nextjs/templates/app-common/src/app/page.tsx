import { Coffee, BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
	return (
		<main className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900">
			{/* Subtle Background Pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

			{/* Absolute positioned Theme Toggle */}
			<div className="absolute right-6 top-6 z-50">
				<ThemeToggle />
			</div>

			<div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center animate-fade-in px-6">
				{/* Premium Badge */}
				<div className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 px-3 py-1 text-sm font-medium text-neutral-600 dark:text-neutral-300 backdrop-blur-sm">
					<span className="flex h-2 w-2 rounded-full bg-neutral-950 dark:bg-neutral-50 mr-2" />
					Enterprise Boilerplate
				</div>

				{/* Hero Typography */}
				<h1 className="text-5xl font-semibold tracking-tight sm:text-7xl text-balance max-w-4xl">
					<span className="bg-gradient-to-br from-neutral-900 to-neutral-500 bg-clip-text text-transparent dark:from-neutral-50 dark:to-neutral-500">
						NEXT.JS
					</span>
					<br />
					Architecture
				</h1>

				<p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg text-balance leading-relaxed">
					A robust foundation for scalable applications. Start building your product with a fully typed, scalable, and modular setup.
				</p>

				{/* Call to Actions */}
				<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
					<a
						href="#"
						className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-6 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-200"
					>
						<BookOpen className="size-4" />
						Documentation
					</a>
					<a
						href="https://github.com/pasqualinigui"
						target="_blank"
						rel="noreferrer"
						className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
					>
						<svg
							role="img"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="size-4 fill-current"
						>
							<title>GitHub</title>
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
						GitHub
					</a>
					<a
						href="https://www.paypal.com/donate/?hosted_button_id=7NWQEZKNPP3VN"
						target="_blank"
						rel="noreferrer"
						className="inline-flex h-11 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
					>
						<Coffee className="size-4" />
						Buy me a coffee
					</a>
				</div>
			</div>
		</main>
	);
}
