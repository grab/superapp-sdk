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
 * @public
 */
export type GetCoordinateResult = {
  /** Latitude coordinate in decimal degrees (for example, `1.3521`). */
  latitude: number;
  /** Longitude coordinate in decimal degrees (for example, `103.8198`). */
  longitude: number;
};

/**
 * Response when getting the device coordinates.
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
 * Response when observing the device coordinates.
 *
 * @group Modules
 * @category Location
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
 * The ISO country code string returned from `JSBridge` (for example, `"SG"` or `"ID"`).
 *
 * @group Modules
 * @category Location
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
 * @public
 */
export type GetCountryCodeResponse =
  | SDKOkResponse<GetCountryCodeResult>
  | SDKNoContentResponse
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
