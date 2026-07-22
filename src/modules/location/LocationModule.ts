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
 * SDK module for accessing device location services via `JSBridge`.
 *
 * @group Modules
 * @category Location
 * @skillReference Device & Sensors
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
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
   * @requiredOAuthScope mobile.geolocation
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Coordinates retrieved successfully. The `result` contains {@link GetCoordinateResult}.
   * - `403` (Forbidden): Client is not authorized to access location data.
   * - `424` (Failed Dependency): Dependency error occurred while retrieving coordinates.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
   *   console.log('Coordinates:', response.result.latitude, response.result.longitude);
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
   * @requiredOAuthScope mobile.geolocation
   *
   * @remarks
   * This method returns an `SDKStream` that continuously emits location updates.
   * Remember to call `unsubscribe()` on the subscription when you no longer need updates
   * to conserve battery and free resources.
   *
   * @returns This stream can emit the following `status_code` values:
   * - `200` (OK): Stream emitted a location update. The `result` contains {@link GetCoordinateResult}.
   * - `400` (Bad Request): Stream emitted an invalid request error.
   * - `403` (Forbidden): Stream emitted an authorization error.
   * - `424` (Failed Dependency): Stream emitted a dependency error.
   * - `500` (Internal Server Error): Stream emitted an unexpected error.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
   *       console.log('Location updated:', response.result.latitude, response.result.longitude);
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
   * @requiredOAuthScope mobile.geolocation
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Country code retrieved successfully. The `result` contains {@link GetCountryCodeResult}.
   * - `204` (No Content): Country code not available.
   * - `403` (Forbidden): Client is not authorized to access location data.
   * - `424` (Failed Dependency): Dependency error occurred while resolving country code.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
