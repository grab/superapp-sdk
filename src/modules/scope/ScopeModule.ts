/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import { HasAccessToResponse, ReloadScopesResponse } from './types';

/**
 * Provides access to scope control related APIs.
 *
 * @remarks
 * The ScopeModule enables miniapps to check permissions and reload scope configurations.
 * Use this module to verify access to sensitive APIs before calling them and to refresh
 * permission states after the user grants new permissions.
 *
 * @example
 * Initialize the ScopeModule:
 * ```typescript
 * import { ScopeModule } from '@grabjs/superapp-sdk';
 *
 * const scopeModule = new ScopeModule();
 * ```
 */
class ScopeModule extends BaseModule {
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
   * Check location permission:
   * ```typescript
   * try {
   *   const response = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
   *   if (response.status_code === 200 && response.result === true) {
   *     const location = await locationModule.getCoordinate();
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Check profile permission:
   * ```typescript
   * try {
   *   const response = await scopeModule.hasAccessTo('ProfileModule', 'fetchEmail');
   *   if (response.status_code === 200 && response.result === true) {
   *     await profileModule.fetchEmail();
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
   *   const response = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
   *
   *   switch (response.status_code) {
   *     case 200:
   *       if (response.result === true) {
   *         console.log('Location access granted');
   *       } else {
   *         console.log('Location access denied');
   *       }
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 500:
   *       console.error('Access check error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
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
   * @returns Promise that resolves to {@link ReloadScopesResponse} when scopes are reloaded.
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   await scopeModule.reloadScopes();
   *   const response = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await scopeModule.reloadScopes();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Scopes reloaded successfully');
   *       const accessResponse = await scopeModule.hasAccessTo('LocationModule', 'getCoordinate');
   *       if (accessResponse.result) {
   *         console.log('New permission is now active');
   *       }
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 500:
   *       console.error('Reload scopes error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  reloadScopes(): Promise<ReloadScopesResponse> {
    return window.WrappedScopeModule.invoke('reloadScopes');
  }
}

export default ScopeModule;
