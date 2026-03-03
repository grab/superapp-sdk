/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for accessing device location services.
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

  getCoordinate() {
    return window.WrappedLocationModule!.invoke('getCoordinate');
  }

  observeLocationChange() {
    return window.WrappedLocationModule!.invoke('observeLocationChange');
  }

  getCountryCode() {
    return window.WrappedLocationModule!.invoke('getCountryCode');
  }
}
