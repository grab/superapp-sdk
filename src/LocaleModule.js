/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from './ModuleBase';

export class LocaleModule extends ModuleBase {
  constructor() {
    super('LocaleModule');
  }

  getLanguageLocaleIdentifier() {
    return window.WrappedLocaleModule.invoke('getLanguageLocaleIdentifier');
  }
}
