/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { Version } from '../version/types';

/**
 * Represents the mobile operating system platform.
 *
 * @public
 */
export type Platform = 'Android' | 'iOS';

/**
 * Represents parsed information from a Grab app user agent string.
 *
 * @public
 */
export interface GrabAppInfo {
  appName: string;
  version: Version;
  platform: Platform;
}
