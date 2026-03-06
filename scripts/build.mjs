/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function clean() {
  console.log('Cleaning...');
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
  }
}

function bundleJS() {
  console.log('Bundling JavaScript...');
  execSync('rollup -c', { stdio: 'inherit', cwd: ROOT_DIR });
}

function moveFilesToDist() {
  console.log('Moving files to dist...');

  fs.mkdirSync(DIST_DIR, { recursive: true });

  const filesToMove = ['index.js', 'index.esm.js'];

  for (const file of filesToMove) {
    const src = path.join(BUILD_DIR, file);
    const dest = path.join(DIST_DIR, file);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
    }
  }
}

function bundleTypes() {
  console.log('Bundling types...');
  execSync('api-extractor run --local', { stdio: 'inherit', cwd: ROOT_DIR });
}

function generateTypeDocJSON() {
  console.log('Generating TypeDoc JSON...');
  const apiJsonPath = path.join(DIST_DIR, 'api.json');
  execSync(`npx typedoc --options typedoc.api.json --json "${apiJsonPath}"`, {
    stdio: 'inherit',
    cwd: ROOT_DIR,
  });
}

function build() {
  try {
    clean();
    bundleJS();
    moveFilesToDist();
    bundleTypes();
    generateTypeDocJSON();
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();
