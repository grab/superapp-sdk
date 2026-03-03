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
  if (
    process.env.CI_COMMIT_BEFORE_SHA &&
    process.env.CI_COMMIT_BEFORE_SHA !== '0000000000000000000000000000000000000000'
  ) {
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

  // Check if package.json was modified in this MR/branch (but version not bumped)
  let packageJsonModified = false;
  if (baseCommit && !isRelease) {
    try {
      const diffFiles = exec(`git diff --name-only ${baseCommit} HEAD`).split('\n');
      packageJsonModified = diffFiles.includes('package.json');
    } catch {
      // Ignore diff errors
    }
  }

  // Also check for local uncommitted changes to package.json
  const hasLocalPkgChanges = !isRelease && hasLocalPackageChanges();

  // If package.json was modified but version not bumped, that's an error
  if ((packageJsonModified || hasLocalPkgChanges) && baseVersion && baseVersion === currentVersion) {
    console.error(
      `\nRelease validation failed: package.json was modified but version was not bumped.`
    );
    console.error(`  Current version: ${currentVersion}`);
    console.error(`  Base version:    ${baseVersion}`);
    console.error('\nPlease bump the version in package.json when preparing a release.');
    process.exit(1);
  }

  if (!isRelease) {
    console.log('\nNo version bump detected. Skipping release validation.');
    process.exit(0);
  }

  const errors = [];

  if (!hasPackageLockChanges()) {
    errors.push(
      `package-lock.json version (${currentVersion}) has not been updated from base version (${baseVersion || 'unknown'}). Run "npm install" and commit package-lock.json with the version bump.`
    );
  }

  if (!hasChangelogEntry(currentVersion)) {
    errors.push(
      `CHANGELOG.md has not been updated for version ${currentVersion}. Add a changelog entry and commit it along with the version bump.`
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
