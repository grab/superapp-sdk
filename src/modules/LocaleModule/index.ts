/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { GetLanguageLocaleIdentifierResponse } from './type';

/**
 * The LocaleModule provides functionality to retrieve current locale information.
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
 * ```javascript
 * import { LocaleModule } from '@grabjs/superapp-sdk';
 *
 * // Ideally, initialize this only once and reuse across app.
 * const localeModule = new LocaleModule();
 * ```
 */
class LocaleModule extends ModuleBase {
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
   * ```javascript
   * localeModule.getLanguageLocaleIdentifier()
   *   .then(({ result, error, status_code }) => {
   *     if (result) {
   *       const locale = result.locale;
   *       console.log("Current locale:", locale);
   *       
   *       // Localize your content based on locale
   *       if (locale === 'id') {
   *         showIndonesianContent();
   *       } else if (locale === 'zh') {
   *         showChineseContent();
   *       } else {
   *         showEnglishContent();
   *       }
   *     } else if (error) {
   *       // Some error happened. Use default language.
   *       console.error("Locale error:", error);
   *       showEnglishContent();
   *     }
   *   });
   * ```
   */
  getLanguageLocaleIdentifier(): Promise<GetLanguageLocaleIdentifierResponse> {
    return window.WrappedLocaleModule.invoke('getLanguageLocaleIdentifier');
  }
}

export default LocaleModule;

export type {
  // GetLanguageLocaleIdentifier
  GetLanguageLocaleIdentifierResponse,
  GetLanguageLocaleIdentifierResult,
} from './type';
