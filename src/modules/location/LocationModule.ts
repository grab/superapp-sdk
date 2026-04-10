/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { GetCoordinateResponseSchema, GetCountryCodeResponseSchema } from './schemas';
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
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * @noInheritDoc
 */
export class LocationModule extends BaseModule {
  constructor() {
    super('LocationModule');
  }

  /**
   * Get the current geographic coordinates of the device.
   *
   * @returns The device's current latitude and longitude coordinates. See {@link GetCoordinateResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { LocationModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the location module
   * const location = new LocationModule();
   *
   * // Get current coordinates
   * const response = await location.getCoordinate();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Coordinates:', response.result.lat, response.result.lng);
   * } else if (isError(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('No permission to access location');
   *       // Trigger IdentityModule.authorize() for scope 'mobile.geolocation', then reload via ScopeModule.reloadScopes() and try again
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getCoordinate(): Promise<GetCoordinateResponse> {
    const response = (await this.invoke({
      method: 'getCoordinate',
    })) as GetCoordinateResponse;

    const responseError = this.validate(GetCoordinateResponseSchema, response);
    if (responseError)
      this.logger.warn('getCoordinate', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Subscribe to location change updates from the device.
   *
   * @remarks
   * This method returns a `BridgeStream` that continuously emits location updates.
   * Remember to call `unsubscribe()` on the subscription when you no longer need updates
   * to conserve battery and free resources.
   *
   * @returns A `BridgeStream` that emits location updates as the device location changes.
   * Use `subscribe()` to listen for updates, or `await` to get the first value only. See {@link ObserveLocationChangeResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { LocationModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the location module
   * const location = new LocationModule();
   *
   * // Subscribe to location changes
   * const subscription = location.observeLocationChange().subscribe({
   *   next: (response) => {
   *     if (isSuccess(response)) {
   *       console.log('Location updated:', response.result.lat, response.result.lng);
   *     } else if (isError(response)) {
   *       switch (response.status_code) {
   *         case 403:
   *           console.log('No permission to access location');
   *           // Trigger IdentityModule.authorize() for scope 'mobile.geolocation', then reload via ScopeModule.reloadScopes() and try again
   *           break;
   *         default:
   *           console.error(`Error ${response.status_code}: ${response.error}`);
   *       }
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
    return this.invokeStream({
      method: 'observeLocationChange',
    }) as ObserveLocationChangeResponse;
  }

  /**
   * Get the country code based on the device's current location.
   *
   * @returns The ISO country code (e.g., 'SG', 'ID') based on the device's location. See {@link GetCountryCodeResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { LocationModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the location module
   * const location = new LocationModule();
   *
   * // Get country code
   * const response = await location.getCountryCode();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Country code:', response.result);
   * } else if (isError(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('No permission to access location');
   *       // Trigger IdentityModule.authorize() for scope 'mobile.geolocation', then reload via ScopeModule.reloadScopes() and try again
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getCountryCode(): Promise<GetCountryCodeResponse> {
    const response = (await this.invoke({
      method: 'getCountryCode',
    })) as GetCountryCodeResponse;

    const responseError = this.validate(GetCountryCodeResponseSchema, response);
    if (responseError)
      this.logger.warn('getCountryCode', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
