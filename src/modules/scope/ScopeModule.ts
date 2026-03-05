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
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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
   * @param module - The bridge module name to check access for.
   * @param method - The method name within the module to check access for.
   *
   * @returns Resolves with the access check result on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Check access to CameraModule.scanQRCode
   * ```typescript
   * const response = await scopeModule.hasAccessTo('CameraModule', 'scanQRCode');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await scopeModule.hasAccessTo('CameraModule', 'scanQRCode');
   *   switch (status_code) {
   *     case 200:
   *       console.log('Has access:', result.hasAccess);
   *       break;
   *     default:
   *       console.log(`Could not check access${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not check access${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  hasAccessTo(module: string, method: string): Promise<HasAccessToResponse> {
    return this.wrappedModule.invoke<HasAccessToResult>('hasAccessTo', { module, method });
  }

  /**
   * Requests to reload the consented OAuth scopes for the current client.
   * This refreshes the permissions from the server.
   *
   * @returns Resolves when scopes are reloaded successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Reload scopes
   * ```typescript
   * const response = await scopeModule.reloadScopes();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await scopeModule.reloadScopes();
   *   switch (status_code) {
   *     case 200:
   *       console.log('Scopes reloaded successfully');
   *       break;
   *     default:
   *       console.log(`Could not reload scopes${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not reload scopes${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  reloadScopes(): Promise<ReloadScopesResponse> {
    return this.wrappedModule.invoke<ReloadScopesResult>('reloadScopes');
  }
}
