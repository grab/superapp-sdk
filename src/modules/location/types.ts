/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import { BridgeStream } from '../../core';
import {
  GetCoordinateResponseSchema,
  GetCoordinateResultSchema,
  GetCountryCodeResponseSchema,
  GetCountryCodeResultSchema,
} from './schemas';

/**
 * Result object containing the geographic coordinates.
 *
 * @example
 * ```typescript
 * { lat: 1.3521, lng: 103.8198 }
 * ```
 *
 * @public
 */
export type GetCoordinateResult = InferOutput<typeof GetCoordinateResultSchema>;

/**
 * Response when getting the device coordinates.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Coordinates retrieved successfully. The `result` contains latitude and longitude.
 * - `403`: Forbidden - client not authorized to access location data.
 * - `424`: GeoKit error - location services unavailable.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type GetCoordinateResponse = InferOutput<typeof GetCoordinateResponseSchema>;

/**
 * Response when observing the device coordinates.
 *
 * @remarks
 * This is a `BridgeStream` that can be:
 * - Subscribed to via `.subscribe()` for continuous updates
 * - Awaited via `await` to get the first value only
 *
 * The stream can emit the same status codes as {@link GetCoordinateResponse}.
 *
 * @public
 */
export type ObserveLocationChangeResponse = BridgeStream<GetCoordinateResponse>;

/**
 * The ISO country code string returned from the native bridge.
 *
 * @example
 * ```typescript
 * 'SG'
 * ```
 *
 * @example
 * ```typescript
 * 'ID'
 * ```
 *
 * @public
 */
export type GetCountryCodeResult = InferOutput<typeof GetCountryCodeResultSchema>;

/**
 * Response when getting the country code.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Country code retrieved successfully. The `result` is the ISO country code string.
 * - `204`: No content - country code not available.
 * - `403`: Forbidden - client not authorized to access location data.
 * - `424`: GeoKit/Resolver error - location services unavailable.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type GetCountryCodeResponse = InferOutput<typeof GetCountryCodeResponseSchema>;
