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
   * @remarks
   * **Required Scope:** `mobile.geolocation`
   *
   * This method retrieves the user's current position as latitude and longitude coordinates.
   *
   * @returns Promise that resolves to {@link GetCoordinateResponse} with latitude and longitude.
   *
   * @example
   * ```javascript
   * locationModule.getCoordinate()
   *   .then(({ result, error, status_code }) => {
   *     if (result) {
   *       const { latitude, longitude } = result;
   *       console.log(`Location: ${latitude}, ${longitude}`);
   *
   *       // Use coordinates for map display or location-based features
   *       displayOnMap(latitude, longitude);
   *     } else if (error) {
   *       console.error("Location error:", error);
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
   * @remarks
   * **Required Scope:** `mobile.geolocation`
   *
   * This method returns a stream that emits location updates as the user moves.
   * Unsubscribe from the subscription to terminate the stream.
   *
   * @returns Promise that resolves to a stream of {@link GetCoordinateResponse} with continuous location updates.
   *
   * @example
   * ```javascript
   * // Subscribe to location changes
   * const subscription = locationModule.observeLocationChange().subscribe({
   *   next: ({ result, error, status_code }) => {
   *     if (result) {
   *       const { latitude, longitude } = result;
   *       console.log(`Updated location: ${latitude}, ${longitude}`);
   *       updateMapMarker(latitude, longitude);
   *     } else if (error) {
   *       console.error("Location update error:", error);
   *     }
   *   },
   *   complete: () => {
   *     console.log("Location stream completed");
   *   }
   * });
   *
   * // Later, unsubscribe to stop receiving updates
   * // subscription.unsubscribe();
   * ```
   */
  observeLocationChange(): Promise<GetCoordinateResponse> {
    return window.WrappedLocationModule.invoke('observeLocationChange');
  }

  /**
   * Get the current user's country code based on their location.
   *
   * @remarks
   * **Required Scope:** `mobile.geolocation`
   *
   * This method determines the user's country code (e.g., "SG", "ID", "MY") based on their GPS coordinates.
   *
   * **Status Codes:**
   * - `200`: Successfully retrieved country code
   * - `204`: No result (location is undefined, uncovered by location service, or in ocean area)
   * - `403`: Location access denied (mobile.geolocation scope not granted)
   * - `424`: Location service unavailable/unaccessible
   *
   * @returns Promise that resolves to {@link GetCountryCodeResponse} with the country code.
   *
   * @example
   * ```javascript
   * locationModule.getCountryCode()
   *   .then((response) => {
   *     switch (response.status_code) {
   *       case 200:
   *         // Success - country code retrieved
   *         console.log('Country code:', response.result);
   *
   *         // Use country code for localization or region-specific features
   *         if (response.result === 'SG') {
   *           showSingaporeContent();
   *         } else if (response.result === 'ID') {
   *           showIndonesiaContent();
   *         }
   *         break;
   *       case 204:
   *         // No result - location is undefined or uncovered by location service
   *         console.log('Location not available');
   *         showDefaultContent();
   *         break;
   *       case 403:
   *         // Permission denied - mobile.geolocation scope not granted
   *         console.error('Location access denied:', response.error);
   *         break;
   *       case 424:
   *         // Location service has issue/unaccessible
   *         console.error('Location service unavailable:', response.error);
   *         break;
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
