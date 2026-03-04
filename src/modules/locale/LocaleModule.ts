/**
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

  /**
   * Retrieves the current language locale identifier from the device.
   *
   * @returns Resolves with the locale identifier on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get the current locale
   * ```typescript
   * const response = await localeModule.getLanguageLocaleIdentifier();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await localeModule.getLanguageLocaleIdentifier({});
   *   switch (status_code) {
   *     case 200:
   *       console.log('Current locale:', result.locale);
   *       break;
   *     default:
   *       console.log(`Could not get locale${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not get locale${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse> {
    return this.wrappedModule.invoke<string>('getLanguageLocaleIdentifier');
  }
}
