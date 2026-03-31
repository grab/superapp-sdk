/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  GetSelectedTravelDestinationResponseSchema,
  GetSelectedTravelDestinationResultSchema,
} from './schemas';

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
export type GetSelectedTravelDestinationResult = v.InferOutput<
  typeof GetSelectedTravelDestinationResultSchema
>;

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
 * @public
 */
export type GetSelectedTravelDestinationResponse = v.InferOutput<
  typeof GetSelectedTravelDestinationResponseSchema
>;
