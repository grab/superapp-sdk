/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { GrabAppInfo, Platform } from './types';

/**
 * Parses a user agent string to extract Grab app information.
 * Recognizes app variants like Grab, GrabBeta, GrabBetaDebug, GrabTaxi, GrabEarlyAccess.
 * Extracts version numbers (major.minor.patch) and platform (Android/iOS).
 *
 * @param userAgent - The user agent string to parse
 * @returns The parsed app info, or null if not a recognized Grab app user agent
 */
function parseGrabAppInfo(userAgent: string): GrabAppInfo | null {
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
 * Detects the Grab app information from the current environment.
 * Reads from `window.navigator.userAgent` to determine if running in a Grab app.
 * Returns null for non-Grab user agents (e.g., browsers).
 *
 * @returns The parsed app info, or null if not running in a recognized Grab app
 *
 * @example
 * ```typescript
 * const appInfo = detectGrabApp();
 * if (appInfo) {
 *   console.log(`Running in ${appInfo.appName} v${appInfo.version.major}.${appInfo.version.minor}.${appInfo.version.patch}`);
 * }
 * ```
 *
 * @internal
 */
export function detectGrabApp(): GrabAppInfo | null {
  if (typeof window === 'undefined' || !window.navigator) {
    return null;
  }

  const userAgent = window.navigator.userAgent;
  if (!userAgent) {
    return null;
  }

  return parseGrabAppInfo(userAgent);
}

/**
 * Checks if the Grab app is running on Android.
 *
 * @param grabAppInfo - The parsed Grab app information
 * @returns true if running on Android, false otherwise
 *
 * @example
 * ```typescript
 * const appInfo = detectGrabApp();
 * if (appInfo && isAndroid(appInfo)) {
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
 * const appInfo = detectGrabApp();
 * if (appInfo && isIOS(appInfo)) {
 *   // iOS-specific logic
 * }
 * ```
 *
 * @internal
 */
export function isIOS(grabAppInfo: GrabAppInfo): boolean {
  return grabAppInfo.platform === 'iOS';
}

/**
 * Checks if the current code is running inside a Grab app webview.
 *
 * @returns true if running in a Grab app (Grab, GrabBeta, GrabTaxi, etc.), false otherwise
 *
 * @example
 * ```typescript
 * if (isRunningInGrabApp()) {
 *   // Use native JSBridge features
 * } else {
 *   // Use web fallback
 * }
 * ```
 *
 * @internal
 */
export function isRunningInGrabApp(): boolean {
  return detectGrabApp() !== null;
}
