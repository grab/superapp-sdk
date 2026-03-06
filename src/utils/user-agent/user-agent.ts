/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { extractGrabAppInfo, GrabAppInfo } from '../platform';

/**
 * Extracts Grab app information from the current window's user agent.
 *
 * @returns The parsed app info, or null if not running in a recognized Grab app
 *
 * @example
 * ```typescript
 * const appInfo = extractGrabAppInfoFromUserAgent();
 * if (appInfo) {
 *   console.log(`Running in ${appInfo.appName} v${appInfo.major}.${appInfo.minor}.${appInfo.patch}`);
 * }
 * ```
 *
 * @internal
 */
export function extractGrabAppInfoFromUserAgent(): GrabAppInfo | null {
  if (typeof window === 'undefined' || !window.navigator) {
    return null;
  }

  const userAgent = window.navigator.userAgent;
  if (!userAgent) {
    return null;
  }

  return extractGrabAppInfo(userAgent);
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
  if (typeof window === 'undefined' || !window.navigator) {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  if (!userAgent) {
    return false;
  }

  return /grab[a-z]*\//i.test(userAgent);
}
