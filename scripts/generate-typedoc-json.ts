#!/usr/bin/env node

/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * TypeDoc JSON Generator Script for Playground
 * Generates TypeDoc JSON output for the React playground to consume
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT_DIR = path.join(__dirname, '..');
const PLAYGROUND_DATA_DIR = path.join(ROOT_DIR, 'playground', 'src', 'data');
const TYPEDOC_OUTPUT = path.join(PLAYGROUND_DATA_DIR, 'typedoc.json');

/**
 * Generate TypeDoc JSON output
 */
function generateTypeDocJSON(): void {
  console.log('Generating TypeDoc JSON for playground...');

  if (!fs.existsSync(PLAYGROUND_DATA_DIR)) {
    fs.mkdirSync(PLAYGROUND_DATA_DIR, { recursive: true });
  }

  try {
    execSync(
      `npx typedoc --json "${TYPEDOC_OUTPUT}" --entryPoints ./src/index.ts --excludePrivate --excludeInternal --excludeExternals false`,
      { cwd: ROOT_DIR, stdio: 'inherit' }
    );
    console.log(`✓ TypeDoc JSON generated at: ${TYPEDOC_OUTPUT}`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to generate TypeDoc JSON:', message);
    process.exit(1);
  }
}

generateTypeDocJSON();
