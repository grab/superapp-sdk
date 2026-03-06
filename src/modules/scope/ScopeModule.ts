/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  HasAccessToResponse,
  HasAccessToResult,
  ReloadScopesResponse,
  ReloadScopesResult,
} from './types';

/**
 * JSBridge module for checking and refreshing API access permissions.
 *
 * @group Modules
 *
 * @remarks
 * Manages OAuth scope permissions, allowing the MiniApp to check access rights and reload scopes from the server.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ScopeModule } from '@grabjs/superapp-sdk';
 * const scope = new ScopeModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const scope = new SuperAppSDK.ScopeModule();
 * </script>
 * ```
 *
 * @public
 */
export class ScopeModule extends BaseModule {
  constructor() {
    super('ScopeModule');
  }

  /**
   * Checks if the current client has access to a specific JSBridge API method.
   *
   * @param module - The name of the bridge module to check access for (e.g., 'CameraModule').
   * @param method - The method name within the module to check access for (e.g., 'scanQRCode').
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Access check completed successfully
   * - `400`: Missing required parameters
   * - `424`: ScopeKit error
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ScopeModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ScopeModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the scope module
   * const scopeModule = new ScopeModule();
   *
   * // Check access to CameraModule.scanQRCode
   * try {
   *   const response = await scopeModule.hasAccessTo('CameraModule', 'scanQRCode');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not check access:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Has access:', response.result.hasAccess);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  hasAccessTo(module: string, method: string): Promise<HasAccessToResponse> {
    return this.wrappedModule.invoke('hasAccessTo', { module, method });
  }

  /**
   * Requests to reload the consented OAuth scopes for the current client.
   * This refreshes the permissions from the server.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Scopes reloaded successfully
   * - `424`: ScopeKit error
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ScopeModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ScopeModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the scope module
   * const scopeModule = new ScopeModule();
   *
   * // Reload scopes
   * try {
   *   const response = await scopeModule.reloadScopes();
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not reload scopes:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Scopes reloaded successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  reloadScopes(): Promise<ReloadScopesResponse> {
    return this.wrappedModule.invoke('reloadScopes');
  }
}
