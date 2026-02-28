#!/usr/bin/env node

/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const HEADER = `/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

const COPYRIGHT_MARKER = 'Copyright (c) Grab';

function addLicenseHeader(filePath) {
  const ext = path.extname(filePath);
  if (ext !== '.ts' && ext !== '.js') {
    return false;
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Cannot read ${filePath}:`, err.message);
    return false;
  }

  if (content.includes(COPYRIGHT_MARKER)) {
    return false;
  }

  let newContent;
  if (content.startsWith('#!')) {
    const firstNewline = content.indexOf('\n');
    if (firstNewline === -1) {
      newContent = content + '\n\n' + HEADER;
    } else {
      newContent =
        content.slice(0, firstNewline + 1) + '\n' + HEADER + content.slice(firstNewline + 1);
    }
  } else {
    newContent = HEADER + '\n' + content;
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

function findSourceFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && !entry.name.startsWith('.')) {
        findSourceFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ext === '.ts' || ext === '.js') {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const args = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
const files = [];

for (const arg of args) {
  try {
    const stat = fs.statSync(arg);
    if (stat.isDirectory()) {
      files.push(...findSourceFiles(arg));
    } else if (stat.isFile()) {
      files.push(arg);
    }
  } catch (err) {
    console.error(`Cannot access ${arg}:`, err.message);
  }
}

if (files.length === 0) {
  console.error('Usage: node add-license-header.js <file1|dir1> [file2|dir2] ...');
  process.exit(1);
}

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
