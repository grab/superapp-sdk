/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Version information for comparison
 */
export type Version = {
  major: number;
  minor: number;
  patch: number;
};

/**
 * Grab user agent information parsed from user agent string
 */
export type GrabUserAgent = {
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
