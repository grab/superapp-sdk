#!/usr/bin/env node

/**
 * TypeDoc JSON Generator Script for Playground
 * Generates TypeDoc JSON output for the React playground to consume
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const ROOT_DIR = path.join(__dirname, '..');
const PLAYGROUND_DATA_DIR = path.join(ROOT_DIR, 'playground', 'src', 'data');
const TYPEDOC_OUTPUT = path.join(PLAYGROUND_DATA_DIR, 'typedoc.json');

/**
 * Generate TypeDoc JSON output
 */
function generateTypeDocJSON() {
  console.log('Generating TypeDoc JSON for playground...');
  
  // Ensure playground data directory exists
  if (!fs.existsSync(PLAYGROUND_DATA_DIR)) {
    fs.mkdirSync(PLAYGROUND_DATA_DIR, { recursive: true });
  }
  
  try {
    execSync(
      `npx typedoc --json "${TYPEDOC_OUTPUT}" --entryPoints ./src/index.ts --excludePrivate --excludeInternal --excludeExternals false`,
      { cwd: ROOT_DIR, stdio: 'inherit' }
    );
    console.log(`✓ TypeDoc JSON generated at: ${TYPEDOC_OUTPUT}`);
  } catch (error) {
    console.error('Failed to generate TypeDoc JSON:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateTypeDocJSON();
