/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import { BackResponseSchema } from './schemas';

/**
 * Result when triggering platform back navigation.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Platform
 *
 * @public
 */
export type BackResult = void;

/**
 * Response when triggering platform back navigation.
 *
 * @group Modules
 * @category Platform
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Back navigation triggered successfully.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type BackResponse = InferOutput<typeof BackResponseSchema>;
