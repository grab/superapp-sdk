/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

/**
 * Coordinate data with latitude and longitude
 */
export type GetCoordinateResult = {
  /**
   * Latitude is horizontal line described for earth coordinates
   */
  latitude: number;
  /**
   * Longitude is vertical line described for earth coordinates
   */
  longitude: number;
};

/**
 * Response type for coordinate retrieval
 */
export type GetCoordinateResponse = WrappedResponse<GetCoordinateResult>;

/**
 * Country code data
 */
export type GetCountryCodeResult = {
  /**
   * ISO country code (e.g., "SG", "ID", "MY")
   */
  countryCode: string;
};

/**
 * Response type for country code retrieval
 */
export type GetCountryCodeResponse = WrappedResponse<GetCountryCodeResult>;
