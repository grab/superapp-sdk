/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for controlling platform navigation.
 *
 * @remarks
 * Provides methods to interact with the native platform navigation stack, such as triggering the back action.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { PlatformModule } from '@grabjs/superapp-sdk';
 * const platform = new PlatformModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const platform = new SuperAppSDK.PlatformModule();
 * </script>
 * ```
 *
 * @public
 */
export class PlatformModule extends BaseModule {
  constructor() {
    super('PlatformModule');
  }

  back() {
    return window.WrappedPlatformModule!.invoke('back');
  }
}
