/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { AuthorizeRequestSchema, AuthorizeResponseSchema } from './schemas';
import type { AuthorizeRequest, AuthorizeResponse } from './types';

/**
 * SDK module for authenticating users with GrabID via `JSBridge`.
 *
 * @group Modules
 * @category Identity
 *
 * @remarks
 * Handles OAuth2/OIDC authorization for the requested scopes.
 * This code must run in the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { IdentityModule } from '@grabjs/superapp-sdk';
 * const identity = new IdentityModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const identity = new SuperAppSDK.IdentityModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class IdentityModule extends BaseModule {
  static readonly MINIMUM_VERSION: Version = { major: 5, minor: 397, patch: 0 };

  constructor() {
    super('IdentityModule');
  }

  /**
   * Initiates an OAuth2 authorization flow with PKCE.
   *
   * @param request - Authorization parameters. Only `scope` is required.
   *   `clientId`, `redirectUri`, `environment`, and `responseMode` are deprecated and
   *   accepted only for backward compatibility; they are ignored.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Authorization completed successfully. The `result` contains {@link AuthorizeResult}.
   * - `204` (No Content): User cancelled the authorization flow.
   * - `400` (Bad Request): Invalid request parameters.
   * - `403` (Forbidden): Client is not authorized for the requested scope.
   * - `426` (Upgrade Required): Requires Grab app version 5.397.0 or newer.
   * - `500` (Internal Server Error): Unexpected error during native authorization.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
   * ```typescript
   * import { IdentityModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * const identity = new IdentityModule();
   *
   * const response = await identity.authorize({
   *   scope: 'openid profile.read phone mobile.storage',
   * });
   *
   * if (isSuccess(response)) {
   *   switch (response.status_code) {
   *     case 200: {
   *       const { code, state, codeVerifier, nonce, redirectUri } = response.result;
   *       console.log('Auth Code:', code);
   *       console.log('State:', state);
   *       console.log('Code Verifier:', codeVerifier);
   *       console.log('Nonce:', nonce);
   *       console.log('Redirect URI:', redirectUri);
   *       break;
   *     }
   *     case 204:
   *       console.log('Authorization cancelled');
   *       break;
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    const requestError = this.validate(AuthorizeRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const supportError = this.checkSupport((appInfo) =>
      meetsMinimumVersion(appInfo.version, IdentityModule.MINIMUM_VERSION)
    );
    if (supportError) return supportError;

    const response = (await this.invoke({
      method: 'authorize',
      params: {
        scope: request.scope,
      },
    })) as AuthorizeResponse;

    const responseError = this.validate(AuthorizeResponseSchema, response);
    if (responseError) {
      this.logger.warn('authorize', `Unexpected response shape: ${responseError}`);
    }

    return response;
  }
}
