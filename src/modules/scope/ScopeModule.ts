/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { HasAccessToResponse, ReloadScopesResponse } from './types';

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
   * @returns Whether the MiniApp has permission to access the specified method.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ScopeModule } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ScopeModule } = window.SuperAppSDK;
   *
   * // Initialize the scope module
   * const scopeModule = new ScopeModule();
   *
   * // Check access to CameraModule.scanQRCode
   * try {
   *   const response = await scopeModule.hasAccessTo('CameraModule', 'scanQRCode');
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Has access:', response.result.hasAccess);
   *       break;
   *     case 400:
   *     case 424:
   *       console.log('Could not check access:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  hasAccessTo(module: string, method: string): HasAccessToResponse {
    return this.invoke('hasAccessTo', { module, method });
  }

  /**
   * Requests to reload the consented OAuth scopes for the current client.
   * This refreshes the permissions from the server.
   *
   * @returns Confirmation that the scopes have been reloaded from the server.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ScopeModule } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ScopeModule } = window.SuperAppSDK;
   *
   * // Initialize the scope module
   * const scopeModule = new ScopeModule();
   *
   * // Reload scopes
   * try {
   *   const response = await scopeModule.reloadScopes();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Scopes reloaded successfully');
   *       break;
   *     case 424:
   *       console.log('Could not reload scopes:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  reloadScopes(): ReloadScopesResponse {
    return this.invoke('reloadScopes');
  }
}
