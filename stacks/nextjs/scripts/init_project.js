#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STACK_VERSIONS = {
	packageManager: "pnpm@11.5.2",
	next: "16.2.9",
	react: "19.2.7",
	reactDom: "19.2.7",
	nextThemes: "0.4.4",
	lucideReact: "0.469.0",
	typescript: "6.0.3",
	biome: "2.4.16",
	valibot: "1.4.1",
	nextSafeAction: "8.5.4",
	drizzleOrm: "0.45.2",
	drizzleKit: "0.31.10",
	pg: "8.21.0",
	betterAuth: "1.6.16",
	tanstackQuery: "5.101.0",
	tanstackQueryDevtools: "5.101.0",
	zustand: "5.0.14",
	clsx: "2.1.1",
	tailwindMerge: "3.6.0",
	serverOnly: "0.0.1",
	turbo: "2.9.18",
	lefthook: "2.1.9",
	opentelemetryApi: "1.9.1",
	vercelOtel: "2.1.3",
	sentryNextjs: "10.57.0",
	vitest: "4.1.8",
	jsdom: "29.1.1",
	testingLibraryReact: "16.3.2",
	testingLibraryJestDom: "6.9.1",
	testingLibraryUserEvent: "14.6.1",
	typesNode: "25.9.3",
	typesPg: "8.20.0",
};

// ==========================================
// 0. Helpers
// ==========================================
function runCommand(cmd, args, options) {
	const fullCmd = `${cmd} ${args.join(" ")}`;
	try {
		execSync(fullCmd, { stdio: "inherit", ...options });
	} catch {
		throw new Error(`Command failed: ${fullCmd}`);
	}
}

function ensureDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function removeIfExists(targetPath) {
	if (fs.existsSync(targetPath)) {
		if (fs.statSync(targetPath).isDirectory()) {
			fs.rmSync(targetPath, { recursive: true, force: true });
		} else {
			fs.unlinkSync(targetPath);
		}
	}
}

function writeFile(targetPath, content) {
	ensureDir(path.dirname(targetPath));
	fs.writeFileSync(targetPath, `${content.trim()}\n`, "utf8");
}

function readJson(targetPath) {
	if (fs.existsSync(targetPath)) {
		return JSON.parse(fs.readFileSync(targetPath, "utf8"));
	}
	return null;
}

function writeJson(targetPath, value) {
	ensureDir(path.dirname(targetPath));
	fs.writeFileSync(targetPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function mergePackageJson(targetPath, patch) {
	const pkg = readJson(targetPath) || {};
	const merged = { ...pkg };
	for (const [k, v] of Object.entries(patch)) {
		if (typeof v === "object" && !Array.isArray(v) && v !== null) {
			merged[k] = { ...merged[k], ...v };
		} else {
			merged[k] = v;
		}
	}
	writeJson(targetPath, merged);
}

function copyFileTemplate(from, to) {
	if (fs.existsSync(from)) {
		ensureDir(path.dirname(to));
		fs.copyFileSync(from, to);
	} else {
		throw new Error(`[FATAL] Template file not found: ${from}`);
	}
}

function copyDirTemplate(fromDir, toDir, excludeFiles = []) {
	if (!fs.existsSync(fromDir)) {
		throw new Error(`[FATAL] Template directory not found: ${fromDir}`);
	}
	ensureDir(toDir);
	const entries = fs.readdirSync(fromDir, { withFileTypes: true });
	for (const entry of entries) {
		if (excludeFiles.includes(entry.name)) continue;
		const src = path.join(fromDir, entry.name);
		const dest = path.join(toDir, entry.name);
		if (entry.isDirectory()) {
			copyDirTemplate(src, dest, excludeFiles);
		} else {
			copyFileTemplate(src, dest);
		}
	}
}

function assertFileExists(targetPath) {
	if (!fs.existsSync(targetPath)) {
		throw new Error(`File missing: ${targetPath}`);
	}
}

function assertFileNotExists(targetPath) {
	if (fs.existsSync(targetPath)) {
		throw new Error(`File should not exist: ${targetPath}`);
	}
}

// ==========================================
// Pipeline Steps
// ==========================================

function parseArgs(argv) {
	const args = argv.slice(2);
	let projectName = "";
	let targetDirectory = "";
	let tier = 1;
	let noInstall = false;
	let noGit = false;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === "--tier" && args[i + 1]) {
			tier = parseInt(args[i + 1], 10);
			i++;
		} else if (args[i] === "--no-install") {
			noInstall = true;
		} else if (args[i] === "--no-git") {
			noGit = true;
		} else if (!projectName) {
			projectName = args[i];
		} else if (!targetDirectory) {
			targetDirectory = args[i];
		}
	}

	if (!projectName || !targetDirectory || ![1, 2, 3].includes(tier)) {
		console.error(
			"[ERR] Usage: node init_project.js <project-name> <target-directory> [--tier 1|2|3] [--no-install] [--no-git]",
		);
		process.exit(1);
	}

	return { projectName, targetDirectory, tier, noInstall, noGit };
}

function createContext(options) {
	const workspaceRoot = path.resolve(options.targetDirectory);
	return {
		...options,
		workspaceRoot,
		appDir: path.join(workspaceRoot, "apps", "web"),
		packagesDir: path.join(workspaceRoot, "packages"),
		templatesRoot: path.join(__dirname, "..", "templates"),
		shouldInstall: !options.noInstall,
		shouldInitGit: !options.noGit,
		log: {
			info: (msg) => console.log(`[INFO] ${msg}`),
			step: (msg) => console.log(`[STEP] ${msg}`),
			warn: (msg) => console.warn(`[WARN] ${msg}`),
			error: (msg) => console.error(`[ERR] ${msg}`),
			done: (msg) => console.log(`[DONE] ${msg}`),
		},
	};
}

async function assertPreconditions(ctx) {
	try {
		execSync("pnpm --version", { stdio: "ignore" });
	} catch {
		ctx.log.error("pnpm is not installed or not available in PATH.");
		ctx.log.info("To resolve this, please install it globally:");
		ctx.log.info("  > npm install -g pnpm");
		ctx.log.info("  > Or via Corepack: corepack enable pnpm");
		process.exit(1);
	}
}

async function createWorkspaceRoot(ctx) {
	ensureDir(ctx.workspaceRoot);
	ensureDir(ctx.packagesDir);
	ensureDir(path.join(ctx.workspaceRoot, "observability"));
	ensureDir(path.join(ctx.workspaceRoot, "tests", "performance", "k6"));

	const pkgJson = {
		name: ctx.projectName,
		private: true,
		packageManager: STACK_VERSIONS.packageManager,
		scripts: {
			dev: "turbo run dev",
			build: "turbo run build",
			lint: "biome check .",
			"lint:fix": "biome check --write .",
			format: "biome format --write .",
			check: "biome check .",
			"check:fix": "biome check --write .",
			typecheck: "turbo run typecheck",
			test: "turbo run test",
			coverage: "turbo run coverage",
		},
		devDependencies: {
			"@biomejs/biome": STACK_VERSIONS.biome,
			typescript: STACK_VERSIONS.typescript,
			turbo: STACK_VERSIONS.turbo,
			lefthook: STACK_VERSIONS.lefthook,
		},
	};
	writeJson(path.join(ctx.workspaceRoot, "package.json"), pkgJson);

	writeJson(path.join(ctx.workspaceRoot, "turbo.json"), {
		$schema: "https://turbo.build/schema.json",
		tasks: {
			build: { outputs: [".next/**", "!.next/cache/**"] },
			dev: { persistent: true, cache: false },
			typecheck: { dependsOn: ["^typecheck"] },
			test: { dependsOn: ["^build"] },
			coverage: { dependsOn: ["^build"] },
		},
	});

	writeFile(
		path.join(ctx.workspaceRoot, "pnpm-workspace.yaml"),
		`packages:\n  - "apps/*"\n  - "packages/*"\n\nignoredBuiltDependencies:\n  - "sharp"\n  - "lefthook"\n  - "@biomejs/biome"\n  - "esbuild"\n`,
	);
}

async function scaffoldNextApp(ctx) {
	const appsDir = path.join(ctx.workspaceRoot, "apps");
	ensureDir(appsDir);

	try {
		runCommand(
			"pnpm",
			[
				"dlx",
				`create-next-app@${STACK_VERSIONS.next}`,
				"web",
				"--ts",
				"--no-eslint",
				"--app",
				"--src-dir",
				"--import-alias",
				'"@/*"',
				"--use-pnpm",
				"--turbopack",
				"--skip-install",
				"--yes",
			],
			{ cwd: appsDir },
		);
	} catch {
		ctx.log.error("create-next-app failed");
		process.exit(1);
	}

	// Force clean up any node_modules or lockfiles that create-next-app might have generated
	const webDir = path.join(appsDir, "web");
	removeIfExists(path.join(webDir, "node_modules"));
	removeIfExists(path.join(webDir, "pnpm-lock.yaml"));
	removeIfExists(path.join(webDir, "package-lock.json"));
	removeIfExists(path.join(webDir, "yarn.lock"));
	removeIfExists(path.join(webDir, "pnpm-workspace.yaml"));
}

async function cleanupGeneratedFiles(ctx) {
	const filesToRemove = [
		".eslintrc.json",
		".eslintrc.js",
		".eslintrc.cjs",
		"eslint.config.js",
		"eslint.config.mjs",
		".prettierrc",
		".prettierrc.json",
		"prettier.config.js",
		"prettier.config.mjs",
		"tailwind.config.ts",
		"tailwind.config.js",
		"postcss.config.js",
		"middleware.ts",
		"src/middleware.ts",
		".babelrc",
		".babelrc.json",
		"babel.config.js",
	];
	for (const file of filesToRemove) {
		removeIfExists(path.join(ctx.appDir, file));
	}
}

async function installCommonDependencies(ctx) {
	if (!ctx.shouldInstall) return;
	runCommand(
		"pnpm",
		[
			"add",
			"-D",
			"-w",
			`turbo@${STACK_VERSIONS.turbo}`,
			`typescript@${STACK_VERSIONS.typescript}`,
			`@biomejs/biome@${STACK_VERSIONS.biome}`,
			`lefthook@${STACK_VERSIONS.lefthook}`,
			"--ignore-scripts",
		],
		{ cwd: ctx.workspaceRoot },
	);

	runCommand(
		"pnpm",
		[
			"add",
			`next@${STACK_VERSIONS.next}`,
			`react@${STACK_VERSIONS.react}`,
			`react-dom@${STACK_VERSIONS.reactDom}`,
			`valibot@${STACK_VERSIONS.valibot}`,
			`clsx@${STACK_VERSIONS.clsx}`,
			`tailwind-merge@${STACK_VERSIONS.tailwindMerge}`,
			`zustand@${STACK_VERSIONS.zustand}`,
			`@opentelemetry/api@${STACK_VERSIONS.opentelemetryApi}`,
			`@vercel/otel@${STACK_VERSIONS.vercelOtel}`,
			`@sentry/nextjs@${STACK_VERSIONS.sentryNextjs}`,
			`next-themes@${STACK_VERSIONS.nextThemes}`,
			`lucide-react@${STACK_VERSIONS.lucideReact}`,
			"--ignore-scripts",
		],
		{ cwd: ctx.appDir },
	);

	runCommand(
		"pnpm",
		[
			"add",
			"-D",
			`vitest@${STACK_VERSIONS.vitest}`,
			`jsdom@${STACK_VERSIONS.jsdom}`,
			`@testing-library/react@${STACK_VERSIONS.testingLibraryReact}`,
			`@testing-library/jest-dom@${STACK_VERSIONS.testingLibraryJestDom}`,
			`@testing-library/user-event@${STACK_VERSIONS.testingLibraryUserEvent}`,
			`@types/node@${STACK_VERSIONS.typesNode}`,
			`typescript@${STACK_VERSIONS.typescript}`,
			"--ignore-scripts",
		],
		{ cwd: ctx.appDir },
	);
}

async function installTierDependencies(ctx) {
	if (!ctx.shouldInstall) return;

	if (ctx.tier >= 2) {
		runCommand(
			"pnpm",
			[
				"add",
				`next-safe-action@${STACK_VERSIONS.nextSafeAction}`,
				`server-only@${STACK_VERSIONS.serverOnly}`,
				"--ignore-scripts",
			],
			{ cwd: ctx.appDir },
		);
	}

	if (ctx.tier === 3) {
		runCommand(
			"pnpm",
			[
				"add",
				`drizzle-orm@${STACK_VERSIONS.drizzleOrm}`,
				`pg@${STACK_VERSIONS.pg}`,
				`better-auth@${STACK_VERSIONS.betterAuth}`,
				`@tanstack/react-query@${STACK_VERSIONS.tanstackQuery}`,
				"--ignore-scripts",
			],
			{
				cwd: ctx.appDir,
			},
		);
		runCommand(
			"pnpm",
			[
				"add",
				"-D",
				`drizzle-kit@${STACK_VERSIONS.drizzleKit}`,
				`@types/pg@${STACK_VERSIONS.typesPg}`,
				`@tanstack/react-query-devtools@${STACK_VERSIONS.tanstackQueryDevtools}`,
				"--ignore-scripts",
			],
			{
				cwd: ctx.appDir,
			},
		);
	}
}

async function applyRootTemplates(ctx) {
	copyDirTemplate(path.join(ctx.templatesRoot, "root"), ctx.workspaceRoot, [
		"package.json",
		"turbo.json",
		"pnpm-workspace.yaml",
	]);
}

async function applyCommonAppTemplates(ctx) {
	copyDirTemplate(path.join(ctx.templatesRoot, "app-common"), ctx.appDir);

	mergePackageJson(path.join(ctx.appDir, "package.json"), {
		name: "web",
		scripts: {
			dev: "next dev --turbopack",
			build: "next build",
			start: "next start",
			typecheck: "tsc --noEmit",
			test: "vitest run",
			coverage: "vitest run --coverage",
		},
	});
}

async function applyTierTemplates(ctx) {
	if (ctx.tier >= 2) {
		copyDirTemplate(path.join(ctx.templatesRoot, "app-tier-2"), ctx.appDir);
	}
	if (ctx.tier === 3) {
		copyDirTemplate(path.join(ctx.templatesRoot, "app-tier-3"), ctx.appDir);
	}
}

async function applyObservabilityTemplates(ctx) {
	copyDirTemplate(
		path.join(ctx.templatesRoot, "observability"),
		path.join(ctx.workspaceRoot, "observability"),
	);

	if (fs.existsSync(path.join(ctx.templatesRoot, "tests"))) {
		copyDirTemplate(
			path.join(ctx.templatesRoot, "tests"),
			path.join(ctx.workspaceRoot, "tests"),
		);
	}
}

async function setupLefthook(ctx) {
	if (!ctx.shouldInitGit) return;

	if (!fs.existsSync(path.join(ctx.workspaceRoot, ".git"))) {
		runCommand("git", ["init"], { cwd: ctx.workspaceRoot });
	}

	if (!ctx.shouldInstall) {
		ctx.log.warn("Skipping lefthook install (--no-install flag active)");
		return;
	}

	try {
		runCommand("pnpm", ["exec", "lefthook", "install"], {
			cwd: ctx.workspaceRoot,
		});
	} catch {
		ctx.log.warn(
			"Could not run lefthook install. Run manually: pnpm exec lefthook install",
		);
	}
}

function assertRequiredTemplateFiles(ctx) {
	const requiredDirs = [
		path.join(ctx.templatesRoot, "root"),
		path.join(ctx.templatesRoot, "app-common"),
		path.join(ctx.templatesRoot, "observability"),
	];

	if (ctx.tier >= 2) {
		requiredDirs.push(path.join(ctx.templatesRoot, "app-tier-2"));
	}
	if (ctx.tier === 3) {
		requiredDirs.push(path.join(ctx.templatesRoot, "app-tier-3"));
	}

	for (const dir of requiredDirs) {
		if (!fs.existsSync(dir)) {
			throw new Error(`[FATAL] Missing required template directory: ${dir}`);
		}
	}

	const requiredFiles = [
		path.join(ctx.templatesRoot, "root", "biome.json"),
		path.join(ctx.templatesRoot, "root", "lefthook.yml"),
		path.join(ctx.templatesRoot, "app-common", "next.config.ts"),
		path.join(ctx.templatesRoot, "app-common", "postcss.config.mjs"),
		path.join(ctx.templatesRoot, "app-common", "tsconfig.json"),
		path.join(ctx.templatesRoot, "app-common", "components.json"),
		path.join(ctx.templatesRoot, "app-common", "src", "app", "globals.css"),
		path.join(ctx.templatesRoot, "app-common", "src", "proxy.ts"),
		path.join(
			ctx.templatesRoot,
			"app-common",
			"src",
			"components",
			"seo",
			"json-ld.tsx",
		),
		path.join(ctx.templatesRoot, "app-common", "public", "mirrors", "home.md"),
		path.join(ctx.templatesRoot, "app-common", "src", "app", "robots.ts"),
		path.join(ctx.templatesRoot, "app-common", "src", "app", "sitemap.ts"),
		path.join(
			ctx.templatesRoot,
			"app-common",
			"src",
			"app",
			"llms.txt",
			"route.ts",
		),
		path.join(
			ctx.templatesRoot,
			"app-common",
			"src",
			"app",
			"llms-full.txt",
			"route.ts",
		),
	];

	if (ctx.tier >= 2) {
		requiredFiles.push(
			path.join(
				ctx.templatesRoot,
				"app-tier-2",
				"src",
				"lib",
				"safe-action.ts",
			),
		);
		requiredFiles.push(
			path.join(
				ctx.templatesRoot,
				"app-tier-2",
				"src",
				"lib",
				"fetcher.server.ts",
			),
		);
	}

	if (ctx.tier === 3) {
		requiredFiles.push(
			path.join(ctx.templatesRoot, "app-tier-3", "drizzle.config.ts"),
		);
		requiredFiles.push(
			path.join(ctx.templatesRoot, "app-tier-3", "src", "db", "index.ts"),
		);
		requiredFiles.push(
			path.join(ctx.templatesRoot, "app-tier-3", "src", "lib", "auth.ts"),
		);
		requiredFiles.push(
			path.join(
				ctx.templatesRoot,
				"app-tier-3",
				"src",
				"app",
				"api",
				"auth",
				"[...all]",
				"route.ts",
			),
		);
	}

	for (const file of requiredFiles) {
		if (!fs.existsSync(file)) {
			throw new Error(`[FATAL] Missing required template file: ${file}`);
		}
	}
}

async function validateScaffold(ctx) {
	const invariants = [
		path.join(ctx.workspaceRoot, "turbo.json"),
		path.join(ctx.workspaceRoot, "pnpm-workspace.yaml"),
		path.join(ctx.appDir, "next.config.ts"),
		path.join(ctx.appDir, "tsconfig.json"),
		path.join(ctx.appDir, "components.json"),
		path.join(ctx.appDir, "vitest.config.ts"),
		path.join(ctx.appDir, "src", "app", "globals.css"),
		path.join(ctx.appDir, "src", "app", "layout.tsx"),
		path.join(ctx.appDir, "src", "app", "page.tsx"),
		path.join(ctx.appDir, "postcss.config.mjs"),
		path.join(ctx.appDir, "src", "proxy.ts"),
		path.join(ctx.appDir, "src", "app", "robots.ts"),
		path.join(ctx.appDir, "src", "app", "sitemap.ts"),
		path.join(ctx.appDir, "src", "app", "llms.txt", "route.ts"),
		path.join(ctx.appDir, "src", "app", "llms-full.txt", "route.ts"),
		path.join(ctx.appDir, "src", "components", "seo", "json-ld.tsx"),
		path.join(ctx.appDir, "public", "mirrors", "home.md"),
		path.join(ctx.appDir, "src", "config", "env.ts"),
		path.join(ctx.appDir, "src", "lib", "utils.ts"),
	];

	for (const inv of invariants) {
		assertFileExists(inv);
	}

	const antiInvariants = [
		path.join(ctx.appDir, "tailwind.config.ts"),
		path.join(ctx.appDir, "tailwind.config.js"),
		path.join(ctx.appDir, "postcss.config.js"),
		path.join(ctx.appDir, "middleware.ts"),
		path.join(ctx.appDir, "src", "middleware.ts"),
		path.join(ctx.appDir, ".babelrc"),
		path.join(ctx.appDir, ".babelrc.json"),
		path.join(ctx.appDir, "babel.config.js"),
	];

	for (const anti of antiInvariants) {
		assertFileNotExists(anti);
	}

	if (ctx.tier >= 2) {
		assertFileExists(path.join(ctx.appDir, "src", "lib", "safe-action.ts"));
		assertFileExists(path.join(ctx.appDir, "src", "lib", "fetcher.server.ts"));
	}

	if (ctx.tier === 3) {
		assertFileExists(path.join(ctx.appDir, "drizzle.config.ts"));
		assertFileExists(path.join(ctx.appDir, "src", "db", "index.ts"));
		assertFileExists(path.join(ctx.appDir, "src", "lib", "auth.ts"));
		assertFileExists(
			path.join(
				ctx.appDir,
				"src",
				"app",
				"api",
				"auth",
				"[...all]",
				"route.ts",
			),
		);
	}
}

function printNextSteps(ctx) {
	ctx.log.done("Scaffold complete.");
	console.log("\nNext steps:");
	console.log(`  cd ${ctx.targetDirectory}`);
	if (!ctx.shouldInstall) console.log("  pnpm install");
	console.log("  pnpm dev");

	if (ctx.tier === 3) {
		console.log("\n# Database (Tier 3):");
		console.log("  pnpm --filter web db:generate");
		console.log("  pnpm --filter web db:migrate");
		console.log("  pnpm --filter web db:studio");
	}

	console.log("\n# Observability (optional):");
	console.log(
		"  docker compose -f observability/docker-compose.observability.yml up -d",
	);
	console.log("  cd tests/performance/k6 && k6 run smoke.js");
}

async function runStep(ctx, name, fn) {
	ctx.log.step(name);
	try {
		await fn(ctx);
	} catch (err) {
		ctx.log.error(`Failed at step: ${name}`);
		console.error(err);
		process.exit(1);
	}
}

async function main() {
	const options = parseArgs(process.argv);
	const ctx = createContext(options);
	ctx.log.info(
		`Scaffolding senior Next.js workspace: ${ctx.projectName} (Tier ${ctx.tier})`,
	);

	await runStep(ctx, "Assert preconditions", () => assertPreconditions(ctx));
	await runStep(ctx, "Assert required template files", () =>
		assertRequiredTemplateFiles(ctx),
	);
	await runStep(ctx, "Create workspace root", () => createWorkspaceRoot(ctx));
	await runStep(ctx, "Scaffold Next app", () => scaffoldNextApp(ctx));
	await runStep(ctx, "Cleanup generated files", () =>
		cleanupGeneratedFiles(ctx),
	);
	await runStep(ctx, "Install common dependencies", () =>
		installCommonDependencies(ctx),
	);
	await runStep(ctx, "Install tier dependencies", () =>
		installTierDependencies(ctx),
	);
	await runStep(ctx, "Apply root templates", () => applyRootTemplates(ctx));
	await runStep(ctx, "Apply common app templates", () =>
		applyCommonAppTemplates(ctx),
	);
	await runStep(ctx, "Apply tier templates", () => applyTierTemplates(ctx));
	await runStep(ctx, "Apply observability templates", () =>
		applyObservabilityTemplates(ctx),
	);
	await runStep(ctx, "Setup Lefthook", () => setupLefthook(ctx));
	await runStep(ctx, "Validate scaffold", () => validateScaffold(ctx));

	printNextSteps(ctx);
}

main();
