/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { Version } from './types';

/**
 * Checks if the version meets the minimum required version.
 *
 * @param version - The version to check
 * @param minimumVersion - The minimum required version
 * @returns true if version \>= minimumVersion, false otherwise
 *
 * @example
 * ```typescript
 * const version = { major: 5, minor: 396, patch: 0 };
 * const minimumVersion = { major: 5, minor: 395, patch: 0 };
 * meetsMinimumVersion(version, minimumVersion); // true
 * ```
 *
 * @internal
 */
export function meetsMinimumVersion(version: Version, minimumVersion: Version): boolean {
  if (version.major !== minimumVersion.major) {
    return version.major > minimumVersion.major;
  }
  if (version.minor !== minimumVersion.minor) {
    return version.minor > minimumVersion.minor;
  }
  return version.patch >= minimumVersion.patch;
}
