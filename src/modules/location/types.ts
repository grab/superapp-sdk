/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';
import { DataStream } from '../../core/stream';

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
export type GetCoordinateResult = {
  /** Latitude in degrees */
  lat: number;
  /** Longitude in degrees */
  lng: number;
};

/**
 * Response when getting the device coordinates.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Coordinates retrieved successfully. The `result` contains latitude and longitude.
 * - `424`: GeoKit error - location services unavailable or permission denied.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - Singapore coordinates:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { lat: 1.3521, lng: 103.8198 }
 * }
 * ```
 *
 * @example
 * **Failed dependency response (424) - GeoKit error:**
 * ```typescript
 * {
 *   status_code: 424,
 *   error: 'GeoKit error'
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
export type GetCoordinateResponse = ConstrainedBridgeResponse<
  GetCoordinateResult,
  200 | 424 | 500 | 501
>;

/**
 * Response when observing the device coordinates.
 *
 * @public
 */
export type ObserveLocationChangeResponse = DataStream<GetCoordinateResult>;

/**
 * Result object containing the country code.
 *
 * @example
 * ```typescript
 * { countryCode: 'SG' }
 * ```
 *
 * @example
 * ```typescript
 * { countryCode: 'ID' }
 * ```
 *
 * @public
 */
export type GetCountryCodeResult = {
  /** ISO country code (e.g., "SG", "ID", "MY") */
  countryCode: string;
};

/**
 * Response when getting the country code.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Country code retrieved successfully. The `result` contains the ISO country code.
 * - `424`: GeoKit/Resolver error - location services unavailable.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - Singapore:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { countryCode: 'SG' }
 * }
 * ```
 *
 * @example
 * **Success response (200) - Indonesia:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { countryCode: 'ID' }
 * }
 * ```
 *
 * @example
 * **Failed dependency response (424):**
 * ```typescript
 * {
 *   status_code: 424,
 *   error: 'GeoKit/Resolver error'
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
export type GetCountryCodeResponse = ConstrainedBridgeResponse<
  GetCountryCodeResult,
  200 | 424 | 500 | 501
>;
