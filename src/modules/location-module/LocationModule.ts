/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import { GetCoordinateResponse, GetCountryCodeResponse } from './types';

/**
 * Provides functionality to access the user's current position.
 *
 * @remarks
 * **Required Scope:** `mobile.geolocation`
 *
 * @example
 * Initialize the LocationModule:
 * ```typescript
 * import { LocationModule } from '@grabjs/superapp-sdk';
 *
 * const locationModule = new LocationModule();
 * ```
 */
class LocationModule extends BaseModule {
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
   * Basic usage:
   * ```typescript
   * try {
   *   const response = await locationModule.getCoordinate();
   *   if (response.status_code === 200) {
   *     const { latitude, longitude } = response.result;
   *     console.log(`Location: ${latitude}, ${longitude}`);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await locationModule.getCoordinate();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       const { latitude, longitude } = response.result;
   *       console.log(`Location: ${latitude}, ${longitude}`);
   *       displayOnMap(latitude, longitude);
   *       break;
   *     case 403:
   *       console.error('Location access denied:', response.error);
   *       break;
   *     case 424:
   *       console.error('Location service unavailable:', response.error);
   *       break;
   *     case 500:
   *       console.error('Location error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
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
   * Basic usage:
   * ```typescript
   * const subscription = locationModule.observeLocationChange().subscribe({
   *   next: (response) => {
   *     if (response.status_code === 200) {
   *       const { latitude, longitude } = response.result;
   *       console.log(`Updated location: ${latitude}, ${longitude}`);
   *       updateMapMarker(latitude, longitude);
   *     }
   *   }
   * });
   *
   * // Later, unsubscribe to stop receiving updates
   * // subscription.unsubscribe();
   * ```
   *
   * @example
   * Handling location updates:
   * ```typescript
   * const subscription = locationModule.observeLocationChange().subscribe({
   *   next: (response) => {
   *     switch (response.status_code) {
   *       case 200:
   *         const { latitude, longitude } = response.result;
   *         console.log(`Updated location: ${latitude}, ${longitude}`);
   *         updateMapMarker(latitude, longitude);
   *         break;
   *       case 403:
   *         console.error('Location access denied:', response.error);
   *         break;
   *       case 424:
   *         console.error('Location service unavailable:', response.error);
   *         break;
   *       case 500:
   *         console.error('Location update error:', response.error);
   *         break;
   *     }
   *   },
   *   complete: () => {
   *     console.log('Location stream completed');
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
   * @remarks
   * **Required Scope:** `mobile.geolocation`
   *
   * This method determines the user's country code (e.g., "SG", "ID", "MY") based on their GPS coordinates.
   *
   * @returns Promise that resolves to {@link GetCountryCodeResponse} with the country code.
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   const response = await locationModule.getCountryCode();
   *   if (response.status_code === 200) {
   *     console.log('Country code:', response.result.countryCode);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await locationModule.getCountryCode();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Country code:', response.result.countryCode);
   *       if (response.result.countryCode === 'SG') {
   *         showSingaporeContent();
   *       } else if (response.result.countryCode === 'ID') {
   *         showIndonesiaContent();
   *       }
   *       break;
   *     case 204:
   *       console.log('Location not available');
   *       showDefaultContent();
   *       break;
   *     case 403:
   *       console.error('Location access denied:', response.error);
   *       break;
   *     case 424:
   *       console.error('Location service unavailable:', response.error);
   *       break;
   *     case 500:
   *       console.error('Country code error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  getCountryCode(): Promise<GetCountryCodeResponse> {
    return window.WrappedLocationModule.invoke('getCountryCode');
  }
}

export default LocationModule;
