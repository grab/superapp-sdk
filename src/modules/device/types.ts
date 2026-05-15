/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import { IsEsimSupportedResponseSchema, IsEsimSupportedResultSchema } from './schemas';

/**
 * Result indicating whether the current device supports eSIM.
 *
 * @group Modules
 * @category Device
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
export type IsEsimSupportedResult = InferOutput<typeof IsEsimSupportedResultSchema>;

/**
 * Response when checking whether the current device supports eSIM.
 *
 * @group Modules
 * @category Device
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: eSIM capability was checked successfully. The `result` contains `true` or `false`.
 * - `403`: Forbidden - client not authorized to query eSIM capability.
 * - `424`: Failed Dependency - underlying telephony/eSIM service unavailable.
 * - `426`: Upgrade Required - feature requires Grab app version 5.402 or above.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type IsEsimSupportedResponse = InferOutput<typeof IsEsimSupportedResponseSchema>;
