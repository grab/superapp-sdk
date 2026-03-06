/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { DataStream } from '@grabjs/mobile-kit-bridge-sdk';
import { ConstrainedBridgeResponse } from '../../core/response/types';

/**
 * Result object containing the geographic coordinates.
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
 * @public
 */
export type GetCoordinateResponse = ConstrainedBridgeResponse<GetCoordinateResult, 200 | 424>;

/**
 * Response when observing the device coordinates.
 *
 * @public
 */
export type ObserveLocationChangeResponse = DataStream<GetCoordinateResult>;

/**
 * Result object containing the country code.
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
 * @public
 */
export type GetCountryCodeResponse = ConstrainedBridgeResponse<GetCountryCodeResult, 200 | 424>;
