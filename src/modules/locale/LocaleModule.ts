/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { GetLanguageLocaleIdentifierResponseSchema } from './schemas';
import { GetLanguageLocaleIdentifierResponse } from './types';

/**
 * JSBridge module for accessing device locale settings.
 *
 * @group Modules
 * @category Locale
 *
 * @remarks
 * Provides the user's preferred language and region settings from the native device.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const locale = new SuperAppSDK.LocaleModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class LocaleModule extends BaseModule {
  constructor() {
    super('LocaleModule');
  }

  /**
   * Retrieves the current language locale identifier from the device.
   *
   * @returns The user's preferred language locale string (e.g., 'en-SG', 'id-ID'). See {@link GetLanguageLocaleIdentifierResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { LocaleModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the locale module
   * const locale = new LocaleModule();
   *
   * // Get the current locale
   * const response = await locale.getLanguageLocaleIdentifier();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Current locale:', response.result);
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse> {
    const response = (await this.invoke({
      method: 'getLanguageLocaleIdentifier',
    })) as GetLanguageLocaleIdentifierResponse;

    const responseError = this.validate(GetLanguageLocaleIdentifierResponseSchema, response);
    if (responseError)
      this.logger.warn(
        'getLanguageLocaleIdentifier',
        `Unexpected response shape: ${responseError}`
      );

    return response;
  }
}
