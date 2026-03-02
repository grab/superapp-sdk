#!/usr/bin/env node

/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import { gzipSync } from 'zlib';

const FILES = ['build/index.js', 'build/index.esm.js'] as const;

function formatBytes(bytes: number): string {
  return `${(bytes / 1024).toFixed(2)} kB`;
}

function main(): void {
  console.log('\nBundle sizes:');
  for (const file of FILES) {
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file);
    const gzipSize = gzipSync(content).length;
    console.log(`  ${file}: ${formatBytes(content.length)} (gzip: ${formatBytes(gzipSize)})`);
  }
  console.log('');
}

main();
