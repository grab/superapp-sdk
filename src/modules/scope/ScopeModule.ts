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
 * Module for checking and refreshing API access permissions via JSBridge.
 *
 * @group Modules
 * @category Scope
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
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
   * @param module - JSBridge module name to check.
   * @param method - Method name within that module.

   * @returns A response with one of the following status codes:
   * - `200`: OK - access check completed successfully. The `result` is `true` if access is granted, otherwise `false`.
   * - `400`: Bad request - missing required parameters, module or method not provided.
   * - `424`: Failed dependency - ScopeKit error, unable to check access due to a dependency error.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the scope module
   * const scope = new ScopeModule();
   *
   * // Check whether the user has access to a module method
   * const response = await scope.hasAccessTo('CameraModule', 'scanQRCode');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Has access:', response.result);
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
      this.logger.warn('hasAccessTo', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Requests to reload the consented OAuth scopes for the current client.
   * This refreshes the permissions from the server.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - scopes reloaded successfully.
   * - `424`: Failed dependency - unable to reload scopes due to a dependency error.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * ```typescript
   * import { ScopeModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the scope module
   * const scope = new ScopeModule();
   *
   * // Reload consented OAuth scopes from the server
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
      this.logger.warn('reloadScopes', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
