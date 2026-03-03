/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for accessing device locale settings.
 *
 * @remarks
 * Provides the user's preferred language and region settings from the native device.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { LocaleModule } from '@grabjs/superapp-sdk';
 * const locale = new LocaleModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const locale = new SuperAppSDK.LocaleModule();
 * </script>
 * ```
 *
 * @public
 */
export class LocaleModule extends BaseModule {
  constructor() {
    super('LocaleModule');
  }

  getLanguageLocaleIdentifier() {
    return window.WrappedLocaleModule.invoke('getLanguageLocaleIdentifier');
  }
}
