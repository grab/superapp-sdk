/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { GrabAppInfo, Platform } from './types';

/**
 * Extracts app information from a user agent string if it belongs to a Grab app.
 * Returns null for non-Grab user agents (e.g., browsers).
 *
 * @param userAgent - The user agent string to parse
 * @returns The parsed app info, or null if the user agent is not a recognized Grab app
 *
 * @example
 * ```typescript
 * const userAgent = "Grab/5.396.0 (Android; Android 14)";
 * const info = extractGrabAppInfo(userAgent);
 * // Result: { appName: "Grab", version: { major: 5, minor: 396, patch: 0 }, platform: "Android" }
 * ```
 *
 * @internal
 */
export function extractGrabAppInfo(userAgent: string): GrabAppInfo | null {
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
    version: {
      major: Number(match[2]),
      minor: Number(match[3]),
      patch: Number(match[4]),
    },
    platform: match[5] as Platform,
  };
}

/**
 * Checks if the Grab app is running on Android.
 *
 * @param grabAppInfo - The parsed Grab app information
 * @returns true if running on Android, false otherwise
 *
 * @example
 * ```typescript
 * const info = extractGrabAppInfo("Grab/5.396.0 (Android; Android 14)");
 * if (isAndroid(info)) {
 *   // Android-specific logic
 * }
 * ```
 *
 * @internal
 */
export function isAndroid(grabAppInfo: GrabAppInfo): boolean {
  return grabAppInfo.platform === 'Android';
}

/**
 * Checks if the Grab app is running on iOS.
 *
 * @param grabAppInfo - The parsed Grab app information
 * @returns true if running on iOS, false otherwise
 *
 * @example
 * ```typescript
 * const info = extractGrabAppInfo("Grab/5.396.0 (iOS; iOS 17)");
 * if (isIOS(info)) {
 *   // iOS-specific logic
 * }
 * ```
 *
 * @internal
 */
export function isIOS(grabAppInfo: GrabAppInfo): boolean {
  return grabAppInfo.platform === 'iOS';
}
