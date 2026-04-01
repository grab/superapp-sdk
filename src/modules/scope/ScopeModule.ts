/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import {
  HasAccessToRequestSchema,
  HasAccessToResponseSchema,
  ReloadScopesResponseSchema,
} from './schemas';
import { HasAccessToResponse, ReloadScopesResponse } from './types';

/**
 * JSBridge module for checking and refreshing API access permissions.
 *
 * @group Modules
 *
 * @remarks
 * Manages OAuth scope permissions, allowing the MiniApp to check access rights and reload scopes from the server.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * @noInheritDoc
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
   * @returns Whether the MiniApp has permission to access the specified method. See {@link HasAccessToResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the scope module
   * const scope = new ScopeModule();
   *
   * // Check access to CameraModule.scanQRCode
   * const response = await scope.hasAccessTo('CameraModule', 'scanQRCode');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Has access:', response.result.hasAccess);
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async hasAccessTo(module: string, method: string): Promise<HasAccessToResponse> {
    const params = { module, method };
    const requestError = this.validate(HasAccessToRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'hasAccessTo',
      params,
    })) as HasAccessToResponse;

    const responseError = this.validate(HasAccessToResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:hasAccessTo] Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Requests to reload the consented OAuth scopes for the current client.
   * This refreshes the permissions from the server.
   *
   * @returns Confirmation that the scopes have been reloaded from the server. See {@link ReloadScopesResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the scope module
   * const scope = new ScopeModule();
   *
   * // Reload scopes
   * const response = await scope.reloadScopes();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Scopes reloaded successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async reloadScopes(): Promise<ReloadScopesResponse> {
    const response = (await this.invoke({
      method: 'reloadScopes',
    })) as ReloadScopesResponse;

    const responseError = this.validate(ReloadScopesResponseSchema, response);
    if (responseError)
      console.warn(`[SDK:reloadScopes] Unexpected response shape: ${responseError}`);

    return response;
  }
}
