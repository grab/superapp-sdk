/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  GetCoordinateResponse,
  GetCountryCodeResponse,
  ObserveLocationChangeResponse,
} from './types';

/**
 * JSBridge module for accessing device location services.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to the device's geolocation data including coordinates and country code.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { LocationModule } from '@grabjs/superapp-sdk';
 * const location = new LocationModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const location = new SuperAppSDK.LocationModule();
 * </script>
 * ```
 *
 * @public
 */
export class LocationModule extends BaseModule {
  constructor() {
    super('LocationModule');
  }

  /**
   * Get the current geographic coordinates of the device.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Coordinates retrieved successfully
   * - `424`: GeoKit error
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { LocationModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { LocationModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the location module
   * const locationModule = new LocationModule();
   *
   * // Get current coordinates
   * try {
   *   const response = await locationModule.getCoordinate();
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not get coordinates:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Coordinates:', response.result.lat, response.result.lng);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getCoordinate(): Promise<GetCoordinateResponse> {
    return this.wrappedModule.invoke('getCoordinate');
  }

  /**
   * Subscribe to location change updates from the device.
   *
   * @returns A `DataStream` that emits location updates as the device location changes.
   * Use `subscribe()` to listen for updates, or `await` to get the first value only.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { LocationModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { LocationModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the location module
   * const locationModule = new LocationModule();
   *
   * // Subscribe to location changes
   * const subscription = locationModule.observeLocationChange().subscribe({
   *   next: (response) => {
   *     if (isResponseOk(response)) {
   *       console.log('Location updated:', response.result.lat, response.result.lng);
   *     }
   *   },
   *   complete: () => console.log('Location stream completed')
   * });
   *
   * // Later, to stop receiving updates:
   * subscription.unsubscribe();
   * ```
   *
   * @public
   */
  observeLocationChange(): ObserveLocationChangeResponse {
    return this.wrappedModule.invoke('observeLocationChange') as ObserveLocationChangeResponse;
  }

  /**
   * Get the country code based on the device's current location.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Country code retrieved successfully
   * - `424`: GeoKit/Resolver error
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { LocationModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { LocationModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the location module
   * const locationModule = new LocationModule();
   *
   * // Get country code
   * try {
   *   const response = await locationModule.getCountryCode();
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not get country code:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Country code:', response.result.countryCode);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getCountryCode(): Promise<GetCountryCodeResponse> {
    return this.wrappedModule.invoke('getCountryCode');
  }
}
