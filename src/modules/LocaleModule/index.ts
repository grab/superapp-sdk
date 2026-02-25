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
   * @returns Promise that resolves to language locale response with locale identifier (e.g., "en", "id")
   *
   * @example
   * ```javascript
   * localeModule.getLanguageLocaleIdentifier()
   *   .then(({ result, error }) => {
   *     if (!!result) {
   *       const locale = result.locale;
   *       console.log("Current locale:", locale);
   *     } else if (!!error) {
   *       // Some error happened. Use default language.
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
