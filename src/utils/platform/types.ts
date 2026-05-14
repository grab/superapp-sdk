/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { _Version } from '../version';

/**
 * Represents the mobile operating system platform.
 *
 * @group Internals
 *
 * @public
 */
export type _Platform = 'Android' | 'iOS';

/**
 * Represents parsed information from a Grab app user agent string.
 *
 * @group Internals
 *
 * @public
 */
export interface _GrabAppInfo {
  appName: string;
  version: _Version;
  platform: _Platform;
}
