/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, NoResultResponse, ErrorResponse, Invoke } from '../../core';

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
 * Success response when coordinates are retrieved successfully
 */
export type GetCoordinateSuccessResponse = SuccessResponse<GetCoordinateResult>;

/**
 * Error response when coordinate retrieval fails
 */
export type GetCoordinateErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `403`: Location access denied (mobile.geolocation scope not granted)
   * - `424`: Location service unavailable/unaccessible
   * - `500`: Internal error retrieving coordinates
   */
  status_code: 403 | 424 | 500;
};

/**
 * Response type for coordinate retrieval
 */
export type GetCoordinateResponse = GetCoordinateSuccessResponse | GetCoordinateErrorResponse;

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
 * Success response when country code is retrieved successfully
 */
export type GetCountryCodeSuccessResponse = SuccessResponse<GetCountryCodeResult>;

/**
 * No result response when location is undefined or uncovered by location service
 */
export type GetCountryCodeNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - No result (location is undefined, uncovered by location service, or in ocean area)
   */
  status_code: 204;
};

/**
 * Error response when country code retrieval fails
 */
export type GetCountryCodeErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `403`: Location access denied (mobile.geolocation scope not granted)
   * - `424`: Location service unavailable/unaccessible
   * - `500`: Internal error retrieving country code
   */
  status_code: 403 | 424 | 500;
};

/**
 * Response type for country code retrieval
 */
export type GetCountryCodeResponse =
  | GetCountryCodeSuccessResponse
  | GetCountryCodeNoResultResponse
  | GetCountryCodeErrorResponse;

/**
 * Method map for LocationModule
 */
export type LocationModuleMethods = {
  getCoordinate: { params: never; response: GetCoordinateResponse };
  observeLocationChange: { params: never; response: GetCoordinateResponse };
  getCountryCode: { params: never; response: GetCountryCodeResponse };
};

declare global {
  interface Window {
    /**
     * Wrapped Location Module interface for invoking native location operations
     */
    WrappedLocationModule: {
      /**
       * Invokes a native location module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<LocationModuleMethods>;
    };
  }
}
