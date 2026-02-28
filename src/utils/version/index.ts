/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { GrabUserAgent, Version } from './types';

/**
 * Parses Grab user agent string to extract app information.
 *
 * @param userAgent - The user agent string to parse (e.g., from `navigator.userAgent`).
 *
 * @returns Parsed user agent information, or `null` if the string does not match the expected format.
 *
 * @remarks
 * Expects format: `{AppName}/v?{major}.{minor}.{patch} ({platform})` where AppName is Grab, GrabBeta,
 * GrabBetaDebug, GrabTaxi, or GrabEarlyAccess, and platform is Android or iOS.
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
 * Checks if the user agent meets or exceeds the minimum required version.
 *
 * @param userAgent - The user agent string (e.g., from `navigator.userAgent`).
 * @param minimum - The minimum version required.
 *
 * @returns `true` if the parsed app version meets or exceeds the minimum; `false` otherwise.
 *
 * @remarks
 * Returns `false` if the user agent does not match the Grab app pattern.
 */
export function meetsMinimumVersion(userAgent: string, minimum: Version): boolean {
  const info = parseGrabUserAgent(userAgent);
  return info !== null && !isVersionBelow(info, minimum);
}

/**
 * Compares two versions to determine if v1 is below v2.
 *
 * @param v1 - The version to check.
 * @param v2 - The version to compare against.
 *
 * @returns `true` if v1 is strictly below v2 (major.minor.patch comparison); `false` otherwise.
 *
 * @remarks
 * Comparison is semantic: major first, then minor, then patch. Equal versions return `false`.
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
