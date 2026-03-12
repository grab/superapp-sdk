/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Result when triggering platform back navigation.
 * This operation returns no data on success.
 *
 * @public
 */
export type BackResult = void;

/**
 * Response when triggering platform back navigation.
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Back navigation triggered successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
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
export type BackResponse = ConstrainedBridgeResponse<BackResult, 204 | 501>;
