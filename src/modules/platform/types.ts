/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { BackResponseSchema } from './schemas';

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type BackResponse = v.InferOutput<typeof BackResponseSchema>;
