/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { describe, expect, it } from 'vitest';

import { meetsMinimumVersion } from './version';

describe('version utilities', () => {
  describe('meetsMinimumVersion', () => {
    it.each([
      {
        description: 'equal versions',
        version: { major: 5, minor: 396, patch: 0 },
        minimumVersion: { major: 5, minor: 396, patch: 0 },
        expected: true,
      },
      {
        description: 'major version exceeds minimum',
        version: { major: 6, minor: 0, patch: 0 },
        minimumVersion: { major: 5, minor: 999, patch: 999 },
        expected: true,
      },
      {
        description: 'major version is below minimum',
        version: { major: 4, minor: 999, patch: 999 },
        minimumVersion: { major: 5, minor: 0, patch: 0 },
        expected: false,
      },
      {
        description: 'minor version exceeds minimum (same major)',
        version: { major: 5, minor: 397, patch: 0 },
        minimumVersion: { major: 5, minor: 396, patch: 999 },
        expected: true,
      },
      {
        description: 'minor version is below minimum (same major)',
        version: { major: 5, minor: 395, patch: 999 },
        minimumVersion: { major: 5, minor: 396, patch: 0 },
        expected: false,
      },
      {
        description: 'patch version exceeds minimum (same major and minor)',
        version: { major: 5, minor: 396, patch: 10 },
        minimumVersion: { major: 5, minor: 396, patch: 5 },
        expected: true,
      },
      {
        description: 'patch version is below minimum (same major and minor)',
        version: { major: 5, minor: 396, patch: 4 },
        minimumVersion: { major: 5, minor: 396, patch: 5 },
        expected: false,
      },
    ])('should return $expected when $description', ({ version, minimumVersion, expected }) => {
      expect(meetsMinimumVersion(version, minimumVersion)).toBe(expected);
    });
  });
});
