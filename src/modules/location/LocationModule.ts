/*!
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
   * @returns The device's current latitude and longitude coordinates.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the location module
   * const locationModule = new LocationModule();
   *
   * // Get current coordinates
   * try {
   *   const response = await locationModule.getCoordinate();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Coordinates:', response.result.lat, response.result.lng);
   *       break;
   *     case 424:
   *       console.log('Could not get coordinates:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  async getCoordinate(): Promise<GetCoordinateResponse> {
    return (await this.invoke('getCoordinate')) as GetCoordinateResponse;
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
   * // Initialize the location module
   * const locationModule = new LocationModule();
   *
   * // Subscribe to location changes
   * const subscription = locationModule.observeLocationChange().subscribe({
   *   next: (response) => {
   *     if (response.status_code === 200) {
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
   * @returns The ISO country code (e.g., 'SG', 'ID') based on the device's location.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the location module
   * const locationModule = new LocationModule();
   *
   * // Get country code
   * try {
   *   const response = await locationModule.getCountryCode();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Country code:', response.result.countryCode);
   *       break;
   *     case 424:
   *       console.log('Could not get country code:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  async getCountryCode(): Promise<GetCountryCodeResponse> {
    return (await this.invoke('getCountryCode')) as GetCountryCodeResponse;
  }
}
