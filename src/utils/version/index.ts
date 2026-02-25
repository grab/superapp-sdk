/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GrabUserAgent, Version } from './type';

/**
 * Parses Grab user agent string to extract app information
 * @param userAgent - The user agent string to parse
 * @returns Parsed user agent information or null if invalid
 */
export function parseGrabUserAgent(userAgent: string): GrabUserAgent {
  if (!userAgent || typeof userAgent !== 'string') {
    return null;
  }

  const match = userAgent.match(
    /(Grab|GrabBeta|GrabBetaDebug|GrabTaxi|GrabEarlyAccess)\/v?([0-9]+)\.([0-9]+)\.([0-9]+) \(.*(Android|iOS).*\)/i
  );
  if (!match) {
    return null;
  }

  return {
    appName: match[1],
    major: Number(match[2]),
    minor: Number(match[3]),
    patch: Number(match[4]),
    platform: match[5],
  };
}

/**
 * Compares two versions to determine if v1 is below v2
 * @param v1 - The version to check
 * @param v2 - The version to compare against
 * @returns True if v1 is below v2, false otherwise
 */
export function isVersionBelow(v1: Version, v2: Version): boolean {
  if (v1.major !== v2.major) {
    return v1.major < v2.major;
  }
  if (v1.minor !== v2.minor) {
    return v1.minor < v2.minor;
  }
  return v1.patch < v2.patch;
}
