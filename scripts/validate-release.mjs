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

  // Second check: local uncommitted changes to package.json with version bump
  if (!isRelease && hasLocalPackageChanges()) {
    if (baseVersion) {
      if (baseVersion !== currentVersion) {
        console.log('\nVersion bump detected in uncommitted changes to package.json.');
        isRelease = true;
      } else {
        console.log(
          `\nVersion has not been bumped. Current version (${currentVersion}) is the same as base version (${baseVersion}).`
        );
        console.log('Please bump the version in package.json before releasing.');
        process.exit(1);
      }
    } else {
      // Can't determine base version, but there are local changes - warn and assume release
      console.log(
        '\nWarning: Uncommitted changes to package.json detected, but cannot determine base version.'
      );
      console.log('Assuming this is a release and running validation.');
      isRelease = true;
    }
  }

  if (!isRelease) {
    // Check if package.json was modified (indicating a release attempt without version bump)
    const packageJsonChanged = baseCommit
      ? exec(`git diff --name-only ${baseCommit} HEAD`)
          .split('\n')
          .some((f) => f === 'package.json')
      : false;

    if (packageJsonChanged && baseVersion) {
      console.error(
        `\nRelease validation failed: Version has not been bumped. Current version (${currentVersion}) is the same as base version (${baseVersion}).`
      );
      console.error('Please bump the version in package.json when modifying it for a release.');
      process.exit(1);
    }

    console.log('\nNo version changes detected. Skipping release validation.');
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
