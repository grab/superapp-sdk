/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core';

/**
 * Result containing the selected travel destination lowercase ISO 3166-1 alpha-2 country code.
 *
 * @example
 * ```typescript
 * 'id'
 * ```
 *
 * @example
 * ```typescript
 * 'sg'
 * ```
 *
 * @public
 */
export type GetSelectedTravelDestinationResult = string;

/**
 * Response when reading the selected travel destination lowercase ISO 3166-1 alpha-2 country code.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: The selected travel destination lowercase ISO 3166-1 alpha-2 country code was returned successfully.
 * - `204`: No selected travel destination is currently available.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: 'id'
 * }
 * ```
 *
 * @example
 * **No content response (204):**
 * ```typescript
 * {
 *   status_code: 204
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
export type GetSelectedTravelDestinationResponse = BridgeResponse<
  200 | 204 | 500 | 501,
  GetSelectedTravelDestinationResult
>;
