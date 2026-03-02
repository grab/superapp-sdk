/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Version information for semantic version comparison.
 *
 * @remarks
 * Used with isVersionBelow for feature version checks (e.g., minimum app version).
 */
export type Version = {
  major: number;
  minor: number;
  patch: number;
};

/**
 * Grab user agent information parsed from the `navigator.userAgent` string.
 *
 * @remarks
 * Returned by parseGrabUserAgent. Use for app/version checks before calling version-dependent APIs.
 */
export type GrabUserAgent = {
  /**
   * App name (e.g., "Grab", "GrabBeta")
   */
  appName: string | undefined;
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
  platform: string | undefined;
} | null;
