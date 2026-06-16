#!/usr/bin/env node

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STACKS_DIR = path.resolve(__dirname, "..", "stacks");

const ASCII_LOGO = `
███████╗██╗     ██╗   ██╗██╗  ██╗███████╗ ██████╗ ███████╗
██╔════╝██║     ██║   ██║██║ ██╔╝██╔════╝██╔═══██╗██╔════╝
█████╗  ██║     ██║   ██║█████╔╝ ███████╗██║   ██║███████╗
██╔══╝  ██║     ██║   ██║██╔═██╗ ╚════██║██║   ██║╚════██║
██║     ███████╗╚██████╔╝██║  ██╗███████║╚██████╔╝███████║
╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
`;

// ==========================================
// Stack Registry
// Each entry defines the available scripts
// for a given stack. To add a new stack,
// create its directory under stacks/ and
// register it here.
// ==========================================
const STACK_REGISTRY = {
	nextjs: {
		description: "Next.js 16 — App Router, Turbopack, Biome, SEO/AEO",
		features: [
			"Turborepo Monorepo Architecture for scalable workspaces",
			"Biome for ultra-fast formatting and linting",
			"Vitest configured for unit and integration testing",
			"Comprehensive Observability (OpenTelemetry + K6 load testing)",
			"Lefthook enforcing pre-commit Git Hooks",
			"Strict AST Validations for Architecture & UI State boundaries",
			"Built-in AEO (AI Engine Optimization) & SEO rules",
			"Docker-ready with standalone Next.js and pgvector PostgreSQL",
		],
		tiers: {
			1: "Frontend only. React 19, TailwindCSS v4, Next.js App Router",
			2: "Frontend + State & Validation. Includes Zustand and Valibot",
			3: "Full-stack. Includes Tier 2 + Hono Edge RPC, Drizzle ORM, Docker DB (pgvector), and Better Auth",
		},
		init: "init_project.js",
		generators: {
			action: {
				script: "generate_action.js",
				usage: "<ActionName> <target-dir>",
			},
			rpc: { script: "generate_rpc_hook.js", usage: "<HookName> <target-dir>" },
		},
		validators: [
			{ script: "validate-architecture.js", label: "Architectural Validation" },
			{ script: "validate-config.js", label: "Configuration Validation" },
			{ script: "validate-ui-state.js", label: "UI State Boundary Validation" },
		],
	},
	// Future stacks — add here when implemented:
	// nestjs: {
	//   description: 'NestJS — Fastify, Hono Edge, Guards, Modules',
	//   init: 'init_project.js',
	//   generators: { controller: { ... }, service: { ... } },
	//   validators: [ ... ],
	// },
	// postgres: {
	//   description: 'PostgreSQL — Docker, Drizzle ORM, pgvector',
	//   init: 'init_database.js',
	//   generators: { migration: { ... }, seed: { ... } },
	//   validators: [ ... ],
	// },
};

// ==========================================
// Helpers
// ==========================================

/**
 * Returns the absolute path to a stack's scripts directory.
 * Exits with a clear error if the stack does not exist.
 */
function getStackScriptsDir(stackName) {
	const dir = path.join(STACKS_DIR, stackName, "scripts");
	if (!fs.existsSync(dir)) {
		console.error(
			`\x1b[31m[ERROR] Stack "${stackName}" is not available.\x1b[0m`,
		);
		console.log(`Available stacks: ${Object.keys(STACK_REGISTRY).join(", ")}`);
		process.exit(1);
	}
	return dir;
}

/**
 * Executes a script from a given stack's scripts directory.
 * Arguments are escaped to handle spaces in paths.
 */
function runScript(stackName, scriptName, scriptArgs) {
	const scriptsDir = getStackScriptsDir(stackName);
	const scriptPath = path.join(scriptsDir, scriptName);

	// Escape arguments with quotes to handle spaces (except flags starting with --)
	const safeArgs = scriptArgs.map((arg) =>
		arg.startsWith("--") ? arg : `"${arg}"`,
	);
	const cmd = `node "${scriptPath}" ${safeArgs.join(" ")}`;

	try {
		execSync(cmd, { stdio: "inherit" });
	} catch {
		console.error(
			`\x1b[31m[ERROR] Failed to execute ${stackName}/${scriptName}\x1b[0m`,
		);
		process.exit(1);
	}
}

/**
 * Prints the CLI help text with all available stacks, generators, and usage examples.
 */
function printHelp() {
	console.log("\x1b[1m\x1b[36m🚀 USAGE\x1b[0m");
	console.log("  $ fluksos <command> [options]\n");

	console.log("\x1b[1m\x1b[36m🛠️  COMMANDS\x1b[0m");
	console.log("  \x1b[32minit\x1b[0m       Initialize a new project");
	console.log("  \x1b[32mgenerate\x1b[0m   Generate code components (actions, rpc, etc.)");
	console.log("  \x1b[32mvalidate\x1b[0m   Run architectural validations\n");

	console.log("\x1b[1m\x1b[36m📚 AVAILABLE STACKS\x1b[0m");
	for (const [name, config] of Object.entries(STACK_REGISTRY)) {
		console.log(
			`  \x1b[35m${name.padEnd(10)}\x1b[0m \x1b[90m—\x1b[0m ${config.description}`,
		);
	}
	console.log("");

	console.log("\x1b[1m\x1b[36m⚙️  INIT OPTIONS\x1b[0m");
	console.log(
		"  \x1b[33m--tier\x1b[0m       Architecture tier (1 = Basic, 2 = Frontend+, 3 = Full-Stack)",
	);
	console.log("  \x1b[33m--no-install\x1b[0m Skip dependency installation");
	console.log("  \x1b[33m--no-git\x1b[0m     Skip Git initialization\n");

	console.log("\x1b[1m\x1b[36m💡 EXAMPLES\x1b[0m");
	console.log("  \x1b[90m# Scaffold a Full-Stack Next.js project\x1b[0m");
	console.log("  $ fluksos init nextjs my-app --tier 3\n");
	console.log("  \x1b[90m# Initialize in the current directory\x1b[0m");
	console.log("  $ fluksos init nextjs . --tier 3\n");
	console.log("  \x1b[90m# View specific stack documentation\x1b[0m");
	console.log("  $ fluksos nextjs --help\n");
}

/**
 * Prints detailed help for a specific stack, including its tiers, features, and generators.
 */
function printStackHelp(stackName) {
	const config = STACK_REGISTRY[stackName];
	console.log(
		`\x1b[1m\x1b[35m=== ${stackName.toUpperCase()} STACK ===\x1b[0m\n`,
	);
	console.log(`\x1b[1m\x1b[36m📝 DESCRIPTION\x1b[0m\n  ${config.description}\n`);

	if (config.features) {
		console.log(`\x1b[1m\x1b[36m✨ FEATURES\x1b[0m`);
		config.features.forEach((f) => {
			console.log(`  \x1b[32m✔\x1b[0m ${f}`);
		});
		console.log("");
	}

	if (config.tiers) {
		console.log(`\x1b[1m\x1b[36m🏗️  TIERS (--tier)\x1b[0m`);
		for (const [tier, desc] of Object.entries(config.tiers)) {
			console.log(`  \x1b[1m\x1b[33mTier ${tier}\x1b[0m : ${desc}`);
		}
		console.log("");
	}

	if (config.generators) {
		console.log(`\x1b[1m\x1b[36m🛠️  GENERATORS\x1b[0m`);
		for (const [name, g] of Object.entries(config.generators)) {
			console.log(
				`  $ fluksos generate ${stackName} \x1b[32m${name}\x1b[0m ${g.usage}`,
			);
		}
		console.log("");
	}

	if (config.validators) {
		console.log(
			`\x1b[1m\x1b[36m🛡️  VALIDATORS\x1b[0m \x1b[90m(fluksos validate ${stackName} <dir>)\x1b[0m`,
		);
		config.validators.forEach((v) => {
			console.log(`  \x1b[90m-\x1b[0m ${v.label}`);
		});
		console.log("");
	}
}

// ==========================================
// Main
// ==========================================
console.log("\x1b[1m\x1b[36m%s\x1b[0m", ASCII_LOGO);
console.log("\x1b[1m\x1b[32mThe Enterprise Stack Generator\x1b[0m\n");

const args = process.argv.slice(2);

// Intercept --help requests
if (args.includes("--help") || args.includes("-h") || args.length === 0) {
	// Check if a specific stack was requested anywhere in the arguments
	const requestedStack = args.find((arg) => STACK_REGISTRY[arg]);

	if (requestedStack) {
		printStackHelp(requestedStack);
	} else {
		printHelp();
	}
	process.exit(0);
}

const command = args[0];

switch (command) {
	// ==========================================
	// fluksos init <stack> <project-name> <target-dir> [options]
	// ==========================================
	case "init": {
		const stack = args[1];

		if (!stack || !STACK_REGISTRY[stack]) {
			console.error(
				`\x1b[31m[ERROR] You must specify a valid stack to initialize.\x1b[0m`,
			);
			console.log(
				`Available stacks: \x1b[32m${Object.keys(STACK_REGISTRY).join(", ")}\x1b[0m`,
			);
			console.log(
				`Example: fluksos init \x1b[32mnextjs\x1b[0m my-app --tier 3`,
			);
			process.exit(1);
		}

		const forwardArgs = args.slice(2);
		const config = STACK_REGISTRY[stack];

		if (!config.init) {
			console.error(
				`\x1b[31m[ERROR] Stack "${stack}" does not support init.\x1b[0m`,
			);
			process.exit(1);
		}

		runScript(stack, config.init, forwardArgs);
		break;
	}

	// ==========================================
	// fluksos generate <stack> <type> <Name> <target-dir>
	// ==========================================
	case "generate": {
		const stack = args[1];

		if (!stack || !STACK_REGISTRY[stack]) {
			console.error(
				`\x1b[31m[ERROR] You must specify a valid stack for generators.\x1b[0m`,
			);
			console.log(
				`Available stacks: \x1b[32m${Object.keys(STACK_REGISTRY).join(", ")}\x1b[0m`,
			);
			console.log(
				`Example: fluksos generate \x1b[32mnextjs\x1b[0m action CreateUser ./src/actions`,
			);
			process.exit(1);
		}

		const subArgs = args.slice(2);
		const generatorName = subArgs[0];
		const config = STACK_REGISTRY[stack];

		if (!generatorName || !config.generators[generatorName]) {
			const available = Object.entries(config.generators)
				.map(([name, g]) => `    generate ${stack} ${name} ${g.usage}`)
				.join("\n");
			console.error(
				`\x1b[31m[ERROR] Unknown generator "${generatorName || ""}" for stack "${stack}".\x1b[0m`,
			);
			console.log(`\nAvailable generators for ${stack}:\n${available}`);
			process.exit(1);
		}

		runScript(stack, config.generators[generatorName].script, subArgs.slice(1));
		break;
	}

	// ==========================================
	// fluksos validate <stack|all> <target-dir>
	// ==========================================
	case "validate": {
		const stackArg = args[1];

		if (!stackArg || (stackArg !== "all" && !STACK_REGISTRY[stackArg])) {
			console.error(
				`\x1b[31m[ERROR] You must specify a valid stack (or "all") to validate.\x1b[0m`,
			);
			console.log(
				`Available options: \x1b[32mall, ${Object.keys(STACK_REGISTRY).join(", ")}\x1b[0m`,
			);
			console.log(
				`Example: fluksos validate \x1b[32mnextjs\x1b[0m ./my-project`,
			);
			process.exit(1);
		}

		const isAll = stackArg === "all";
		const validateArgs = args.slice(2);

		const stacksToValidate = isAll ? Object.keys(STACK_REGISTRY) : [stackArg];

		for (const stack of stacksToValidate) {
			const config = STACK_REGISTRY[stack];
			if (!config.validators || config.validators.length === 0) {
				console.log(
					`\x1b[33m[WARN]\x1b[0m Stack "${stack}" has no validators configured. Skipping.`,
				);
				continue;
			}

			console.log(
				`\x1b[1m\x1b[36m[${stack.toUpperCase()}]\x1b[0m Running validators...\n`,
			);

			for (const v of config.validators) {
				console.log(`\x1b[36m[INFO]\x1b[0m ${v.label}...`);
				runScript(stack, v.script, validateArgs);
			}
		}

		console.log("\x1b[32m[SUCCESS] All validations passed!\x1b[0m");
		break;
	}

	default: {
		console.error(`\x1b[31m[ERROR] Unknown command: ${command}\x1b[0m`);
		console.log('Run "fluksos --help" to see all available commands.');
		process.exit(1);
	}
}
