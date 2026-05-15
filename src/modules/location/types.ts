/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse, SDKStream } from '../../core';

/**
 * Result object containing the geographic coordinates.
 *
 * @group Modules
 * @category Location
 *
 * @example
 * ```typescript
 * { latitude: 1.3521, longitude: 103.8198 }
 * ```
 *
 * @public
 */
export type GetCoordinateResult = {
  latitude: number;
  longitude: number;
};

/**
 * Response when getting the device coordinates.
 *
 * @group Modules
 * @category Location
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
export type GetCoordinateResponse =
  | SDKOkResponse<GetCoordinateResult>
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when observing the device coordinates.
 *
 * @group Modules
 * @category Location
 *
 * @remarks
 * This is an `SDKStream` that can be:
 * - Subscribed to via `.subscribe()` for continuous updates
 * - Awaited via `await` to get the first value only
 *
 * The stream can emit `200`, `400`, `403`, `424`, `500`, and `501` status codes.
 *
 * @public
 */
export type ObserveLocationChangeResponse = SDKStream<
  | SDKOkResponse<GetCoordinateResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>
>;

/**
 * The ISO country code string returned from `JSBridge`.
 *
 * @group Modules
 * @category Location
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
export type GetCountryCodeResult = string;

/**
 * Response when getting the country code.
 *
 * @group Modules
 * @category Location
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
export type GetCountryCodeResponse =
  | SDKOkResponse<GetCountryCodeResult>
  | SDKNoContentResponse
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
