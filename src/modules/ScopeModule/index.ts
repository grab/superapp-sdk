/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { HasAccessToResponse, ReloadScopesResponse } from './type';

/**
 * The ScopeModule provides access to scope control related APIs.
 *
 * @example
 * ```javascript
 * import { ScopeModule } from '@grabjs/superapp-sdk';
 *
 * // Ideally, initialize this only once and reuse across app.
 * const scopeModule = new ScopeModule();
 * ```
 */
class ScopeModule extends ModuleBase {
  constructor() {
    super('ScopeModule');
  }

  /**
   * Check if the current client has access to a specific API method.
   *
   * @param module - Bridge module name
   * @param method - Method name
   * @returns Promise that resolves to boolean indicating whether access is granted
   *
   * @example
   * ```javascript
   * scopeModule.hasAccessTo('LocationModule', 'getCoordinate')
   *   .then(({ result, error }) => {
   *     if (!!result) {
   *       // There is a valid result.
   *       console.log("Has access:", result);
   *     } else if (!!error) {
   *       // Some error happened.
   *     }
   *   });
   * ```
   */
  hasAccessTo(module: string, method: string): Promise<HasAccessToResponse> {
    return window.WrappedScopeModule.invoke('hasAccessTo', { module, method });
  }

  /**
   * Request to reload consented scopes for the current client.
   *
   * @returns Promise that resolves when scopes are reloaded
   *
   * @example
   * ```javascript
   * scopeModule.reloadScopes()
   *   .then(({ status_code, error }) => {
   *     if (`${status_code}`.startsWith('20')) {
   *       // The operation succeeded.
   *     } else if (!!error) {
   *       // Some error happened.
   *     }
   *   });
   * ```
   */
  reloadScopes(): Promise<ReloadScopesResponse> {
    return window.WrappedScopeModule.invoke('reloadScopes');
  }
}

export default ScopeModule;

export type {
  // HasAccessTo
  HasAccessToResponse,

  // ReloadScopes
  ReloadScopesResponse,
} from './type';
