/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { GetCoordinateResponse, GetCountryCodeResponse } from './type';

/**
 * The LocationModule provides functionality to access the user's current position.
 *
 * **Required Scope:** `mobile.geolocation`
 *
 * @example
 * ```javascript
 * import { LocationModule } from '@grabjs/superapp-sdk';
 *
 * // Ideally, initialize this only once and reuse across app.
 * const locationModule = new LocationModule();
 * ```
 */
class LocationModule extends ModuleBase {
  constructor() {
    super('LocationModule');
  }

  /**
   * Get the current user's coordinate (latitude and longitude).
   *
   * **Required Scope:** `mobile.geolocation`
   *
   * @returns Promise that resolves to coordinate response with latitude and longitude
   *
   * @example
   * ```javascript
   * locationModule.getCoordinate()
   *   .then(({ result, error }) => {
   *     if (!!result) {
   *       const { latitude, longitude } = result;
   *     } else if (!!error) {
   *       // Some error happened.
   *     }
   *   });
   * ```
   */
  getCoordinate(): Promise<GetCoordinateResponse> {
    return window.WrappedLocationModule.invoke('getCoordinate');
  }

  /**
   * Stream the current user's coordinates with continuous updates.
   *
   * **Required Scope:** `mobile.geolocation`
   *
   * @returns Promise that resolves to coordinate response with latitude and longitude
   *
   * @example
   * ```javascript
   * // Unsubscribe from this subscription to terminate the stream.
   * const subscription = locationModule.observeLocationChange().subscribe({
   *   next: ({ result, error }) => {
   *     if (!!result) {
   *       const { latitude, longitude } = result;
   *     } else if (!!error) {
   *       // Some error happened.
   *     }
   *   },
   *   complete: () => {
   *     // Completion logic for when the stream completes.
   *   }
   * });
   * ```
   */
  observeLocationChange(): Promise<GetCoordinateResponse> {
    return window.WrappedLocationModule.invoke('observeLocationChange');
  }

  /**
   * Get the current user's country code based on their location.
   *
   * The location method returns an object with different structures based on the result:
   * - **Success Response (Status Code 200)**:
   *   ```javascript
   *   {
   *     "status_code": 200,
   *     "result": "SG" // The country code (e.g., "SG", "ID", "MY")
   *   }
   *   ```
   * - **No Result Response (Status Code 204)**: Location is undefined or uncovered by location service
   *   ```javascript
   *   {
   *     "status_code": 204
   *     // No result property
   *     // No error property
   *   }
   *   ```
   * - **Error Response (Status Code 403)**: Location access denied
   *   ```javascript
   *   {
   *     "status_code": 403,
   *     "error": "Location access denied"
   *     // No result property
   *   }
   *   ```
   * - **Error Response (Status Code 424)**: Location service unavailable
   *   ```javascript
   *   {
   *     "status_code": 424,
   *     "error": "Determining country code from coordinates fails"
   *     // No result property
   *   }
   *   ```
   *
   * **Required Scope:** `mobile.geolocation`
   *
   * **Status Codes:**
   * - `200`: Successfully retrieved country code
   * - `204`: No result (location is undefined or uncovered by location service or in ocean area)
   * - `403`: Location access denied (mobile.geolocation scope not granted)
   * - `424`: Location service unavailable/unaccessible
   *
   * @returns Promise that resolves to country code response
   *
   * @example
   * ```javascript
   * locationModule.getCountryCode()
   *   .then((response) => {
   *     switch (response.status_code) {
   *       case 200:
   *         // Success - country code retrieved
   *         console.log('Country code:', response.result);
   *         break;
   *       case 204:
   *         // No result - location is undefined or might be uncovered by location service data
   *         console.log('No result - location is undefined or uncovered by location service');
   *         break;
   *       case 403:
   *         // Permission denied - mobile.geolocation scope not granted
   *         console.log('Location access denied:', response.error);
   *         break;
   *       case 424:
   *         // Location service has issue/unaccessible
   *         console.log('Location service unavailable:', response.error);
   *         break;
   *       default:
   *         // Handle other potential status codes
   *         console.log('Error:', response.error);
   *     }
   *   });
   * ```
   */
  getCountryCode(): Promise<GetCountryCodeResponse> {
    return window.WrappedLocationModule.invoke('getCountryCode');
  }
}

export default LocationModule;

export type {
  // GetCoordinate
  GetCoordinateResponse,
  GetCoordinateResult,

  // GetCountryCode
  GetCountryCodeResponse,
  GetCountryCodeResult,
} from './type';
