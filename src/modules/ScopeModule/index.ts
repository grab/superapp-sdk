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
   * @remarks
   * Use this method to verify permissions before calling sensitive APIs.
   * Returns `true` if the scope is granted, `false` otherwise.
   *
   * @param module - Bridge module name (e.g., "LocationModule", "ProfileModule").
   * @param method - Method name (e.g., "getCoordinate", "fetchEmail").
   *
   * @returns Promise that resolves to {@link HasAccessToResponse} with a boolean indicating access.
   *
   * @example
   * ```javascript
   * // Check location permission before accessing coordinates
   * const { result, error, status_code } = await scopeModule.hasAccessTo(
   *   'LocationModule',
   *   'getCoordinate'
   * );
   *
   * if (result === true) {
   *   console.log("Location access granted");
   *   // Proceed with location API call
   *   const location = await locationModule.getCoordinate();
   * } else if (result === false) {
   *   console.log("Location access denied");
   *   // Show message to user or request permission
   *   showPermissionRequest();
   * } else if (error) {
   *   console.error("Access check error:", error);
   * }
   *
   * // Check profile permission
   * scopeModule.hasAccessTo('ProfileModule', 'fetchEmail')
   *   .then(({ result }) => {
   *     if (result) {
   *       profileModule.fetchEmail();
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
   * @remarks
   * Use this method after the user has granted new permissions to refresh the scope cache.
   * This ensures that subsequent {@link hasAccessTo} calls reflect the updated permissions.
   *
   * **Status Codes:**
   * - `200` or `204`: The operation succeeded
   *
   * @returns Promise that resolves to {@link ReloadScopesResponse} when scopes are reloaded.
   *
   * @example
   * ```javascript
   * // After user grants new permissions
   * scopeModule.reloadScopes()
   *   .then(({ status_code, error }) => {
   *     if (status_code === 200 || status_code === 204) {
   *       console.log("Scopes reloaded successfully");
   *
   *       // Now check if new permission is available
   *       scopeModule.hasAccessTo('LocationModule', 'getCoordinate')
   *         .then(({ result }) => {
   *           if (result) {
   *             console.log("New permission is now active");
   *           }
   *         });
   *     } else if (error) {
   *       console.error("Reload scopes error:", error);
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
