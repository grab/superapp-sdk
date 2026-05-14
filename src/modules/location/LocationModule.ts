/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { _BaseModule } from '../../core';
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
 * @category Location
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
export class LocationModule extends _BaseModule {
  constructor() {
    super('LocationModule');
  }

  /**
   * Get the current geographic coordinates of the device.
   *
   * @requiredOAuthScope mobile.geolocation
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - coordinates retrieved successfully. The `result` is {@link GetCoordinateResult}.
   * - `403`: Forbidden - client not authorized to access location data.
   * - `424`: Failed dependency - GeoKit error, location services unavailable.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
   * @returns A `SDKStream` that emits location updates as the device location changes.
   * Use `subscribe()` to listen for updates, or `await` to get the first value only.
   *
   * Stream results can have the following status codes:
   * - `200`: OK - coordinates retrieved successfully. The `result` is {@link GetCoordinateResult}.
   * - `400`: Bad request - invalid parameters.
   * - `403`: Forbidden - client not authorized to access location data.
   * - `424`: Failed dependency - GeoKit error, location services unavailable.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * This method returns a `SDKStream` that continuously emits location updates.
   * Remember to call `unsubscribe()` on the subscription when you no longer need updates
   * to conserve battery and free resources.
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
   * @returns A response with one of the following status codes:
   * - `200`: OK - country code retrieved successfully. The `result` is the ISO country code `string`.
   * - `204`: No content - country code not available.
   * - `403`: Forbidden - client not authorized to access location data.
   * - `424`: Failed dependency - GeoKit/Resolver error, location services unavailable.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
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
   *   if (response.status_code === 200) {
   *     console.log('Country code:', response.result);
   *   } else if (response.status_code === 204) {
   *     console.log('Country code unavailable');
   *   }
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
