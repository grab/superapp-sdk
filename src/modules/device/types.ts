/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKOkResponse } from '../../core';

/**
 * Result indicating whether the current device supports eSIM.
 *
 * @example
 * ```typescript
 * true
 * ```
 *
 * @example
 * ```typescript
 * false
 * ```
 *
 * @group Modules
 * @category Device
 *
 * @public
 */
export type IsEsimSupportedResult = boolean;

/**
 * Response returned by {@link DeviceModule.isEsimSupported}.
 *
 * @group Modules
 * @category Device
 *
 * @public
 */
export type IsEsimSupportedResponse =
  | SDKOkResponse<IsEsimSupportedResult>
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
