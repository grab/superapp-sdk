/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Checks if the user agent indicates the web app is running inside the Grab app (JSBridge connected).
 *
 * @internal
 *
 * @param userAgent - The user agent string (e.g., from `navigator.userAgent`).
 *
 * @returns `true` if the user agent matches the Grab app pattern (e.g., "Grab/", "GrabBeta/"); `false` otherwise.
 *
 * @remarks
 * Uses the regex `/grab[a-z]*\//i` to match Grab app user agents. Use this before calling SDK methods
 * that require a native connection, or to tailor the experience for in-app vs standalone web.
 */
export function isGrabAppConnected(userAgent: string): boolean {
  return /grab[a-z]*\//i.test(userAgent);
}
