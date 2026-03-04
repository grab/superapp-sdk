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
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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
   * @returns Resolves with the device's latitude and longitude coordinates, or error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get current coordinates
   * ```typescript
   * const response = await locationModule.getCoordinate();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await locationModule.getCoordinate();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Coordinates:', result.lat, result.lng);
   *       break;
   *     default:
   *       console.log(`Could not get coordinates${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not get coordinates${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getCoordinate(): Promise<GetCoordinateResponse> {
    return this.wrappedModule.invoke('getCoordinate') as Promise<GetCoordinateResponse>;
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
   * Subscribe to location changes
   * ```typescript
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
   * @example
   * Get only the first location update
   * ```typescript
   * const response = await locationModule.observeLocationChange();
   * if (response.status_code === 200) {
   *   console.log('First location:', response.result.lat, response.result.lng);
   * }
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
   * @returns Resolves with the ISO country code (e.g., "SG", "ID", "MY"), or error information if the request fails.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get country code
   * ```typescript
   * const response = await locationModule.getCountryCode();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await locationModule.getCountryCode();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Country code:', result.countryCode);
   *       break;
   *     default:
   *       console.log(`Could not get country code${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not get country code${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getCountryCode(): Promise<GetCountryCodeResponse> {
    return this.wrappedModule.invoke('getCountryCode') as Promise<GetCountryCodeResponse>;
  }
}
