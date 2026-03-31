/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { IsEsimSupportedResponseSchema, IsEsimSupportedResultSchema } from './schemas';

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
export type IsEsimSupportedResult = v.InferOutput<typeof IsEsimSupportedResultSchema>;

/**
 * Response when checking whether the current device supports eSIM.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: eSIM capability was checked successfully. The `result` contains `true` or `false`.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type IsEsimSupportedResponse = v.InferOutput<typeof IsEsimSupportedResponseSchema>;
