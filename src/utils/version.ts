/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Version information for comparison
 */
export type VersionInfo = {
  major: number;
  minor: number;
  patch: number;
};

/**
 * Grab user agent information parsed from user agent string
 */
export type GrabUserAgentInfo = {
  /**
   * App name (e.g., "Grab", "GrabBeta")
   */
  appName: string;
  /**
   * Major version number
   */
  major: number;
  /**
   * Minor version number
   */
  minor: number;
  /**
   * Patch version number
   */
  patch: number;
  /**
   * Platform (Android or iOS)
   */
  platform: string;
} | null;

/**
 * Parses Grab user agent string to extract app information
 * @param userAgent - The user agent string to parse
 * @returns Parsed user agent information or null if invalid
 */
export function parseGrabUserAgent(userAgent: string): GrabUserAgentInfo {
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
 * Compares two versions to determine if current is below minimum
 * @param current - The current version to check
 * @param min - The minimum version to compare against
 * @returns True if current version is below minimum, false otherwise
 */
export function isVersionBelow(current: VersionInfo, min: VersionInfo): boolean {
  if (current.major !== min.major) {
    return current.major < min.major;
  }
  if (current.minor !== min.minor) {
    return current.minor < min.minor;
  }
  return current.patch < min.patch;
}
