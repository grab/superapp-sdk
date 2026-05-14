/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import {
  type SDKErrorResponse,
  type SDKNoContentResponse,
  type SDKOkResponse,
  SDKStream,
} from '../../core';

/**
 * Result object containing the geographic coordinates.
 *
 * @example
 * ```typescript
 * { latitude: 1.3521, longitude: 103.8198 }
 * ```
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export interface GetCoordinateResult {
  latitude: number;
  longitude: number;
}

/**
 * Response returned by {@link LocationModule.getCoordinate}.
 *
 * @group Modules
 * @category Location
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
 * Result emitted when observing location changes.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export type ObserveLocationChangeResult =
  | SDKOkResponse<GetCoordinateResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response returned by {@link LocationModule.observeLocationChange}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export type ObserveLocationChangeResponse = SDKStream<ObserveLocationChangeResult>;

/**
 * The ISO country code string returned from the native JSBridge.
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
 * @group Modules
 * @category Location
 *
 * @public
 */
export type GetCountryCodeResult = string;

/**
 * Response returned by {@link LocationModule.getCountryCode}.
 *
 * @group Modules
 * @category Location
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
