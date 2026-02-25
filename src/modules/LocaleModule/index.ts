/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { LanguageLocaleResponse } from './type';

export class LocaleModule extends ModuleBase {
  constructor() {
    super('LocaleModule');
  }

  /**
   * Get the language locale identifier
   * @returns Promise that resolves to language locale response
   */
  getLanguageLocaleIdentifier(): Promise<LanguageLocaleResponse> {
    return window.WrappedLocaleModule.invoke('getLanguageLocaleIdentifier');
  }
}

export type { LanguageLocaleResult, LanguageLocaleResponse } from './type';
