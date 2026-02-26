/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import { GetLanguageLocaleIdentifierResponse } from './types';

/**
 * Provides functionality to retrieve current locale information.
 *
 * @remarks
 * The LocaleModule enables miniapps to detect the user's language preference in the Grab app
 * and localize content accordingly.
 *
 * **Supported Languages:**
 * - English (`en`)
 * - Indonesia (`id`)
 * - Chinese (`zh`)
 * - Malaysia (`ms`)
 * - Thai (`th`)
 * - Vietnamese (`vi`)
 * - Burmese Zawgyi (`zg`)
 * - Burmese Unicode (`my`)
 * - Khmer (`km`)
 *
 * @example
 * Initialize the LocaleModule:
 * ```typescript
 * import { LocaleModule } from '@grabjs/superapp-sdk';
 *
 * const localeModule = new LocaleModule();
 * ```
 */
class LocaleModule extends BaseModule {
  constructor() {
    super('LocaleModule');
  }

  /**
   * Get the current language locale identifier.
   *
   * @remarks
   * The locale identifier follows standard language codes (e.g., "en", "id", "zh").
   * Use this to localize your content to match the user's language preference in the Grab app.
   *
   * **Supported Languages:**
   * - `en`: English
   * - `id`: Indonesia
   * - `zh`: Chinese
   * - `ms`: Malaysia
   * - `th`: Thai
   * - `vi`: Vietnamese
   * - `zg`: Burmese Zawgyi
   * - `my`: Burmese Unicode
   * - `km`: Khmer
   *
   * @returns Promise that resolves to {@link GetLanguageLocaleIdentifierResponse} with the locale identifier.
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   const response = await localeModule.getLanguageLocaleIdentifier();
   *   if (response.status_code === 200) {
   *     const locale = response.result.locale;
   *     console.log('Current locale:', locale);
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
   *   const response = await localeModule.getLanguageLocaleIdentifier();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       const locale = response.result.locale;
   *       console.log('Current locale:', locale);
   *       if (locale === 'id') {
   *         showIndonesianContent();
   *       } else if (locale === 'zh') {
   *         showChineseContent();
   *       } else {
   *         showEnglishContent();
   *       }
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       showEnglishContent();
   *       break;
   *     case 500:
   *       console.error('Locale error:', response.error);
   *       showEnglishContent();
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse> {
    return window.WrappedLocaleModule.invoke('getLanguageLocaleIdentifier');
  }
}

export default LocaleModule;
