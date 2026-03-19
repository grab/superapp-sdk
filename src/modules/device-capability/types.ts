/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core';

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
 * @public
 */
export type IsEsimSupportedResult = boolean;

/**
 * Response when checking whether the current device supports eSIM.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: eSIM capability was checked successfully. The `result` contains `true` or `false`.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - eSIM supported:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: true
 * }
 * ```
 *
 * @example
 * **Success response (200) - eSIM not supported:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: false
 * }
 * ```
 *
 * @example
 * **Internal server error response (500):**
 * ```typescript
 * {
 *   status_code: 500,
 *   error: 'Internal server error'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type IsEsimSupportedResponse = BridgeResponse<200 | 500 | 501, IsEsimSupportedResult>;
