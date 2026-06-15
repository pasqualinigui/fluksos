"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button
				type="button"
				className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 opacity-50"
				aria-label="Loading Theme Toggle"
			>
				<span className="sr-only">Loading Theme Toggle</span>
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
			aria-label="Toggle theme"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-neutral-800" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neutral-200" />
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
