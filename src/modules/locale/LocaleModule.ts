/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { GetLanguageLocaleIdentifierResponse } from './types';

/**
 * JSBridge module for accessing device locale settings.
 *
 * @group Modules
 *
 * @remarks
 * Provides the user's preferred language and region settings from the native device.
 * This code must run on the Grab SuperApp's webview to function correctly.
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

  /**
   * Retrieves the current language locale identifier from the device.
   *
   * @returns A promise that resolves to a `200` status code with the locale identifier.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { LocaleModule, isResponseOk } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { LocaleModule, isResponseOk } = window.SuperAppSDK;
   *
   * // Initialize the locale module
   * const localeModule = new LocaleModule();
   *
   * // Get the current locale
   * try {
   *   const response = await localeModule.getLanguageLocaleIdentifier();
   *
   *   if (isResponseOk(response)) {
   *     console.log('Current locale:', response.result);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse> {
    return this.wrappedModule.invoke('getLanguageLocaleIdentifier');
  }
}
