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

function exec(command, options = {}) {
  return execSync(command, {
    encoding: 'utf-8',
    cwd: ROOT_DIR,
    ...options,
  }).trim();
}

function getFileFromCommit(commit, filePath) {
  try {
    return exec(`git show ${commit}:${filePath}`);
  } catch {
    return null;
  }
}

function parseJson(content) {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function getCurrentVersion() {
  const packageJson = parseJson(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf-8'));
  return packageJson?.version;
}

function hasChangelogEntry(version) {
  const changelogPath = path.join(ROOT_DIR, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) {
    return false;
  }
  const changelog = fs.readFileSync(changelogPath, 'utf-8');
  const versionPattern = new RegExp(
    `## \\[${version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`,
    'm'
  );
  return versionPattern.test(changelog);
}

function hasPackageLockChanges() {
  try {
    exec('git diff --name-only | grep -q "^package-lock.json$"');
    return true;
  } catch {
    try {
      exec('git diff --cached --name-only | grep -q "^package-lock.json$"');
      return true;
    } catch {
      return false;
    }
  }
}

function getBaseCommit() {
  // GitLab CI environment variables
  if (process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA) {
    return process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA;
  }
  if (process.env.CI_COMMIT_BEFORE_SHA && process.env.CI_COMMIT_BEFORE_SHA !== '0000000000000000000000000000000000000000') {
    return process.env.CI_COMMIT_BEFORE_SHA;
  }

  // Try to find merge base with origin/master
  try {
    return exec('git merge-base HEAD origin/master');
  } catch {
    try {
      return exec('git merge-base HEAD master');
    } catch {
      return null;
    }
  }
}

function getVersionFromCommit(commit) {
  const content = getFileFromCommit(commit, 'package.json');
  if (!content) return null;
  const parsed = parseJson(content);
  return parsed?.version;
}

function hasLocalPackageChanges() {
  try {
    exec('git diff --name-only | grep -q "^package.json$"');
    return true;
  } catch {
    try {
      exec('git diff --cached --name-only | grep -q "^package.json$"');
      return true;
    } catch {
      return false;
    }
  }
}

function validateRelease() {
  const currentVersion = getCurrentVersion();
  if (!currentVersion) {
    console.error('Failed to read current version from package.json');
    process.exit(1);
  }

  console.log(`Current version: ${currentVersion}`);

  // First check: compare version against base commit (for committed changes)
  const baseCommit = getBaseCommit();
  let isRelease = false;
  let baseVersion = null;

  if (baseCommit) {
    baseVersion = getVersionFromCommit(baseCommit);
    if (baseVersion) {
      console.log(`Base version (from ${baseCommit.slice(0, 8)}): ${baseVersion}`);
      if (baseVersion !== currentVersion) {
        isRelease = true;
        console.log('\nVersion changed from base commit - this is a release.');
      }
    }
  }

  // Second check: local uncommitted changes to package.json
  if (!isRelease && hasLocalPackageChanges()) {
    console.log('\nUncommitted changes to package.json detected.');
    isRelease = true;
  }

  if (!isRelease) {
    console.log('\nNo version changes detected. Skipping release validation.');
    process.exit(0);
  }

  const errors = [];

  if (!hasPackageLockChanges()) {
    errors.push(
      'package-lock.json has not been updated. Run "npm install" after bumping the version.'
    );
  }

  if (!hasChangelogEntry(currentVersion)) {
    errors.push(
      `No changelog entry found for version ${currentVersion}. Add an entry to CHANGELOG.md.`
    );
  }

  if (errors.length > 0) {
    console.error('\nRelease validation failed:\n');
    errors.forEach((error) => {
      console.error(`  - ${error}`);
    });
    console.error('\nPlease fix these issues before releasing.');
    process.exit(1);
  }

  console.log('\nRelease validation passed!');
  console.log(`  Version: ${currentVersion}`);
  if (baseVersion) {
    console.log(`  Bumped from: ${baseVersion}`);
  }
  console.log('  package-lock.json updated');
  console.log(`  CHANGELOG.md entry exists for ${currentVersion}`);
}

validateRelease();
