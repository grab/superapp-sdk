/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { HasAccessToResponse, ReloadScopesResponse } from './type';

export class ScopeModule extends ModuleBase {
  constructor() {
    super('ScopeModule');
  }

  /**
   * Check if current client has access to specific API
   * @param module - Bridge module name
   * @param method - Method name
   * @returns Promise that resolves to boolean indicating access
   */
  hasAccessTo(module: string, method: string): Promise<HasAccessToResponse> {
    return window.WrappedScopeModule.invoke('hasAccessTo', { module, method });
  }

  /**
   * Request to reload consented scopes for current client
   * @returns Promise that resolves when scopes are reloaded
   */
  reloadScopes(): Promise<ReloadScopesResponse> {
    return window.WrappedScopeModule.invoke('reloadScopes');
  }
}

export type { HasAccessToRequest, HasAccessToResponse, ReloadScopesResponse } from './type';
