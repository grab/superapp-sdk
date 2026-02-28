#!/usr/bin/env node

/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';

const HEADER = `/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

const COPYRIGHT_MARKER = 'Copyright (c) Grab';

const SUPPORTED_EXTENSIONS = ['.ts', '.js', '.mjs', '.cjs'];

function addLicenseHeader(filePath: string, checkOnly = false): boolean {
  const ext = path.extname(filePath);
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    return false;
  }

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Cannot read ${filePath}:`, message);
    return false;
  }

  if (content.includes(COPYRIGHT_MARKER)) {
    return false;
  }

  if (checkOnly) {
    return true;
  }

  let newContent: string;
  if (content.startsWith('#!')) {
    const firstNewline = content.indexOf('\n');
    if (firstNewline === -1) {
      newContent = `${content}\n\n${HEADER}`;
    } else {
      newContent = `${content.slice(0, firstNewline + 1)}\n${HEADER}${content.slice(firstNewline + 1)}`;
    }
  } else {
    newContent = `${HEADER}\n${content}`;
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

function findSourceFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && !entry.name.startsWith('.')) {
        findSourceFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const hasCheck = process.argv.includes('--check');
const args = process.argv.slice(2).filter((arg) => arg !== '--check' && !arg.startsWith('-'));
const paths = args.length > 0 ? args : ['src', 'scripts'];
const files: string[] = [];

for (const arg of paths) {
  try {
    const stat = fs.statSync(arg);
    if (stat.isDirectory()) {
      files.push(...findSourceFiles(arg));
    } else if (stat.isFile()) {
      files.push(arg);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Cannot access ${arg}:`, message);
  }
}

if (files.length === 0) {
  console.error('Usage: node add-license-header.ts [--check] <file1|dir1> [file2|dir2] ...');
  process.exit(1);
}

if (hasCheck) {
  const missing: string[] = [];
  for (const file of files) {
    if (addLicenseHeader(file, true)) {
      missing.push(file);
    }
  }
  if (missing.length > 0) {
    for (const file of missing) {
      console.log('Missing license header:', file);
    }
    console.log(`${missing.length} file(s) missing license header`);
    process.exit(1);
  }
} else {
  let modified = 0;
  for (const file of files) {
    if (addLicenseHeader(file)) {
      console.log('Added header:', file);
      modified++;
    }
  }
  if (modified > 0) {
    console.log(`Modified ${modified} file(s)`);
  }
}
