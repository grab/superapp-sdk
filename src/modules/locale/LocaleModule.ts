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
   * @returns The user's preferred language locale string (e.g., 'en-SG', 'id-ID').
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the locale module
   * const localeModule = new LocaleModule();
   *
   * // Get the current locale
   * try {
   *   const response = await localeModule.getLanguageLocaleIdentifier();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Current locale:', response.result);
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
  async getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse> {
    return (await this.invoke(
      'getLanguageLocaleIdentifier'
    )) as GetLanguageLocaleIdentifierResponse;
  }
}
