#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

const allowedExtensions = new Set(['.md']);
const requiredFrontmatterKeys = ['name', 'description', 'agents'];
const allowedTopLevelDirs = new Set(['examples', 'references', 'scripts']);

function walk(dir) {
  const entries = readdirSync(dir);

  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (fullPath === join(ROOT, '.git') || fullPath.includes('node_modules')) {
        return [];
      }

      return walk(fullPath);
    }

    return [fullPath];
  });
}

function hasFrontmatter(content) {
  return content.startsWith('---\n');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const block = match[1];
  const lines = block.split('\n');
  const data = {};

  for (const line of lines) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    data[key] = value;
  }

  return data;
}

function isTopLevelAllowed(filePath) {
  const rel = relative(ROOT, filePath);
  const parts = rel.split(/[\\/]/);

  if (parts.length === 1) return true;
  return allowedTopLevelDirs.has(parts[0]);
}

function validateMarkdownFile(filePath) {
  const rel = relative(ROOT, filePath);

  if (!isTopLevelAllowed(filePath)) {
    return [`${rel}: top-level directory not recognized by skill convention`];
  }

  const content = readFileSync(filePath, 'utf8');

  if (!hasFrontmatter(content)) {
    return [`${rel}: missing frontmatter`];
  }

  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    return [`${rel}: invalid frontmatter`];
  }

  const errors = [];

  for (const key of requiredFrontmatterKeys) {
    if (!frontmatter[key]) {
      errors.push(`${rel}: missing required frontmatter key -> ${key}`);
    }
  }

  return errors;
}

function main() {
  const files = walk(ROOT);
  const markdownFiles = files.filter((file) => {
    return allowedExtensions.has(file.slice(file.lastIndexOf('.')));
  });

  const errors = markdownFiles.flatMap(validateMarkdownFile);

  if (errors.length > 0) {
    console.error('\n\x1b[31m[ERROR]\x1b[0m Errors found in skill:\n');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('\x1b[32m[SUCCESS]\x1b[0m Skill validated successfully.');
}

main();
