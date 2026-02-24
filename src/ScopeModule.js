/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from './ModuleBase';

export class ScopeModule extends ModuleBase {
  constructor() {
    super('ScopeModule');
  }

  hasAccessTo(module, method) {
    return window.WrappedScopeModule.invoke('hasAccessTo', { module, method });
  }
  reloadScopes() {
    return window.WrappedScopeModule.invoke('reloadScopes');
  }
}
