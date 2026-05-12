/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateRandomString,
} from '../../utils/crypto';
import { isErrorWithMessage } from '../../utils/error';
import { detectGrabApp } from '../../utils/platform';
import { meetsMinimumVersion, Version } from '../../utils/version';
import {
  CODE_CHALLENGE_METHOD,
  CODE_VERIFIER_LENGTH,
  NONCE_LENGTH,
  OPENID_CONFIG_ENDPOINTS,
  STATE_LENGTH,
} from './constants';
import { AuthorizationConfigurationError } from './errors';
import {
  AuthorizeRequestSchema,
  ClearAuthorizationArtifactsRequestSchema,
  GetAuthorizationArtifactsRequestSchema,
  RawAuthorizeResponseSchema,
} from './schemas';
import {
  pkceGetItem,
  pkceRemoveItem,
  pkceSetItem,
  resolvePkceStorage,
} from './storage';
import {
  AuthorizeRequest,
  AuthorizeResponse,
  ClearAuthorizationArtifactsRequest,
  ClearAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsRequest,
  GetAuthorizationArtifactsResponse,
  PkceStorage,
  PkceWriteResult,
  RawAuthorizeResponse,
} from './types';

/**
 * JSBridge module for authenticating users via GrabID.
 *
 * @group Modules
 *
 * @remarks
 * Handles OAuth2/OIDC authentication flows with PKCE support, enabling MiniApps to obtain user identity tokens.
 * Supports both native in-app consent and web-based fallback flows.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
  constructor() {
    super('IdentityModule');
  }

  /**
   * Fetches the authorization endpoint URL from the OpenID configuration.
   *
   * @param environment - The environment to fetch configuration for ('staging' or 'production').
   * @returns The authorization endpoint URL.
   * @throws Error when the environment is invalid or the configuration cannot be fetched.
   * @internal
   */
  private async fetchAuthorizationEndpoint(environment: 'staging' | 'production'): Promise<string> {
    const configUrl = OPENID_CONFIG_ENDPOINTS[environment];
    if (!configUrl) {
      throw new Error(`Invalid environment: ${environment}. Must be 'staging' or 'production'`);
    }

    try {
      const response = await fetch(configUrl);
      if (!response.ok) {
        console.error(
          `Failed to fetch OpenID configuration from ${configUrl}: ${response.status} ${response.statusText}`
        );
        throw new AuthorizationConfigurationError('Failed to fetch authorization configuration');
      }

      const config = (await response.json()) as { authorization_endpoint: string };
      if (!config.authorization_endpoint) {
        console.error('authorization_endpoint not found in OpenID configuration response');
        throw new AuthorizationConfigurationError('Invalid authorization configuration');
      }

      return config.authorization_endpoint;
    } catch (error) {
      console.error('Error fetching authorization endpoint:', error);

      if (error instanceof AuthorizationConfigurationError) {
        throw error;
      }

      throw new Error('Something wrong happened when fetching authorization configuration', {
        cause: error,
      });
    }
  }

  /**
   * Generates PKCE (Proof Key for Code Exchange) artifacts for the OAuth2 authorization flow.
   *
   * @returns An object containing the nonce, state, code verifier, code challenge, and code challenge method.
   *
   * @internal
   */
  private async generatePKCEArtifacts(): Promise<{
    nonce: string;
    state: string;
    codeVerifier: string;
    codeChallenge: string;
    codeChallengeMethod: string;
  }> {
    const nonce = generateRandomString(NONCE_LENGTH);
    const state = generateRandomString(STATE_LENGTH);
    const codeVerifier = generateCodeVerifier(CODE_VERIFIER_LENGTH);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    return {
      nonce,
      state,
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: CODE_CHALLENGE_METHOD,
    };
  }

  /**
   * Stores PKCE artifacts for later retrieval during token exchange.
   *
   * @param kind - Storage backend selected for this flow.
   * @param artifacts - The PKCE artifacts to store, including nonce, state, code verifier, and redirect URI.
   * @returns Success, or a bridge-style error if a write failed.
   *
   * @internal
   */
  private async storePKCEArtifacts(
    kind: PkceStorage,
    artifacts: {
      nonce: string;
      state: string;
      codeVerifier: string;
      redirectUri: string;
    }
  ): Promise<PkceWriteResult> {
    const entries: [string, string][] = [
      ['nonce', artifacts.nonce],
      ['state', artifacts.state],
      ['code_verifier', artifacts.codeVerifier],
      ['redirect_uri', artifacts.redirectUri],
    ];

    for (const [key, value] of entries) {
      const result = await pkceSetItem(kind, key, value);
      if (!result.ok) return result;
    }

    return { ok: true };
  }

  /**
   * Retrieves stored PKCE authorization artifacts.
   * These artifacts are used to complete the OAuth2 authorization code exchange.
   *
   * @param request - Optional storage selector. Use the same `pkceStorage` as {@link IdentityModule.authorize}.
   *   When omitted, defaults to `web_session_storage` (`window.sessionStorage`).
   *
   * @returns The stored PKCE artifacts including state, code verifier, nonce, and redirect URI. See {@link GetAuthorizationArtifactsResponse}.
   *
   * @remarks
   * **Important:** The `redirectUri` returned by this method is the actual redirect URI
   * that was sent to the authorization server. This may differ from the `redirectUri`
   * you provided to `authorize()` if you used `responseMode: 'in_place'` with native flow.
   * You must use this returned `redirectUri` for token exchange to ensure OAuth compliance.
   *
   * **PKCE storage:** Defaults to `web_session_storage`. Use `grab_storage` only when you passed
   * `pkceStorage: 'grab_storage'` to `authorize()` (requires `mobile.storage` scope). There is no automatic fallback.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { IdentityModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the identity module
   * const identity = new IdentityModule();
   *
   * // Retrieve stored authorization artifacts after authorization redirect
   * const response = await identity.getAuthorizationArtifacts();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   switch (response.status_code) {
   *     case 200:
   *       // All artifacts present - proceed with token exchange
   *       const { state, codeVerifier, nonce, redirectUri } = response.result;
   *       console.log('State:', state);
   *       console.log('Code Verifier:', codeVerifier);
   *       console.log('Nonce:', nonce);
   *       console.log('Redirect URI:', redirectUri);
   *       break;
   *     case 204:
   *       // No artifacts yet - user hasn't authorized
   *       console.log('No authorization artifacts found');
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
  async getAuthorizationArtifacts(
    request?: GetAuthorizationArtifactsRequest
  ): Promise<GetAuthorizationArtifactsResponse> {
    if (request !== undefined) {
      const requestError = this.validate(GetAuthorizationArtifactsRequestSchema, request);
      if (requestError) return { status_code: 400, error: requestError };
    }

    const kind = resolvePkceStorage(request?.pkceStorage);

    const stateRes = await pkceGetItem(kind, 'state');
    if (!stateRes.ok) return { status_code: stateRes.status_code, error: stateRes.error };

    const codeVerifierRes = await pkceGetItem(kind, 'code_verifier');
    if (!codeVerifierRes.ok) {
      return { status_code: codeVerifierRes.status_code, error: codeVerifierRes.error };
    }

    const nonceRes = await pkceGetItem(kind, 'nonce');
    if (!nonceRes.ok) return { status_code: nonceRes.status_code, error: nonceRes.error };

    const redirectUriRes = await pkceGetItem(kind, 'redirect_uri');
    if (!redirectUriRes.ok) {
      return { status_code: redirectUriRes.status_code, error: redirectUriRes.error };
    }

    const state = stateRes.value;
    const codeVerifier = codeVerifierRes.value;
    const nonce = nonceRes.value;
    const redirectUri = redirectUriRes.value;

    if (state === null && codeVerifier === null && nonce === null && redirectUri === null) {
      return { status_code: 204 };
    }

    if (state !== null && codeVerifier !== null && nonce !== null && redirectUri !== null) {
      return {
        status_code: 200,
        result: { state, codeVerifier, nonce, redirectUri },
      };
    }

    return {
      status_code: 400,
      error: 'Inconsistent authorization artifacts in storage',
    };
  }

  /**
   * Clears all stored PKCE authorization artifacts for the selected storage backend.
   * This should be called after a successful token exchange or when you need to
   * reset the authorization state (e.g., on error or logout).
   *
   * @param request - Optional storage selector. Use the same `pkceStorage` as {@link IdentityModule.authorize}.
   *   When omitted, defaults to `web_session_storage` (`window.sessionStorage`).
   *
   * @returns Confirmation that the authorization artifacts have been cleared. See {@link ClearAuthorizationArtifactsResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { IdentityModule, isSuccess } from '@grabjs/superapp-sdk';
   *
   * // Initialize the identity module
   * const identity = new IdentityModule();
   *
   * // Clear stored authorization artifacts after successful token exchange
   * const response = await identity.clearAuthorizationArtifacts();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Authorization artifacts cleared');
   * }
   * ```
   *
   * @public
   */
  async clearAuthorizationArtifacts(
    request?: ClearAuthorizationArtifactsRequest
  ): Promise<ClearAuthorizationArtifactsResponse> {
    if (request !== undefined) {
      const requestError = this.validate(ClearAuthorizationArtifactsRequestSchema, request);
      if (requestError) return { status_code: 400, error: requestError };
    }

    const kind = resolvePkceStorage(request?.pkceStorage);
    const keys = ['nonce', 'state', 'code_verifier', 'redirect_uri', 'login_return_uri'] as const;

    for (const key of keys) {
      const result = await pkceRemoveItem(kind, key);
      if (!result.ok) return { status_code: result.status_code, error: result.error };
    }

    return {
      status_code: 204,
    };
  }

  /**
   * Normalizes a URL string to its origin and pathname (without query params or hash).
   *
   * @param urlString - The URL string to normalize.
   * @returns The normalized URL containing only origin and pathname.
   *
   * @internal
   */
  private static normalizeUrl(urlString: string): string {
    const parsedUrl = new URL(urlString);
    return `${parsedUrl.origin}${parsedUrl.pathname}`;
  }

  /**
   * Builds the authorization URL with query parameters.
   *
   * @param authorizationEndpoint - The authorization endpoint URL.
   * @param requestMap - An object containing the request parameters.
   * @returns The complete authorization URL with query string.
   *
   * @internal
   */
  private static buildAuthorizeUrl(
    authorizationEndpoint: string,
    requestMap: Record<string, string | number | boolean | undefined>
  ): string {
    const query = Object.entries(requestMap)
      .filter(
        (entry): entry is [string, string | number | boolean] =>
          entry[1] !== undefined && entry[1] !== null
      )
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${authorizationEndpoint}?${query}`;
  }

  /**
   * Determines whether to use web-based consent flow based on app version and environment.
   *
   * @param request - The authorization request containing the environment setting.
   * @returns True if web consent should be used, false for native consent.
   *
   * @internal
   */
  private static shouldUseWebConsent(request: AuthorizeRequest): boolean {
    const grabAppInfo = detectGrabApp();
    if (!grabAppInfo) {
      return true;
    }

    if (request.environment === 'staging') {
      return false;
    }

    const minimumVersion: Version = { major: 5, minor: 396, patch: 0 };
    return !meetsMinimumVersion(grabAppInfo.version, minimumVersion);
  }

  /**
   * Performs web-based OAuth2 authorization by redirecting to the authorization server.
   *
   * @param params - The authorization parameters.
   *
   * @returns The authorization result, including status and redirect information.
   *
   * @internal
   */
  private async performWebAuthorization(params: {
    clientId: string;
    redirectUri: string;
    scope: string;
    nonce: string;
    state: string;
    codeChallenge: string;
    codeChallengeMethod: string;
    environment: 'staging' | 'production';
    pkceStorageKind: PkceStorage;
  }): Promise<AuthorizeResponse> {
    const loginUriResult = await pkceSetItem(
      params.pkceStorageKind,
      'login_return_uri',
      window.location.href
    );
    if (!loginUriResult.ok) {
      return { status_code: loginUriResult.status_code, error: loginUriResult.error };
    }

    // Update the stored redirectUri to match what will be sent to the authorization server
    // This is necessary when falling back from native flow, where the initially stored
    // redirectUri might have been the normalized current URL (for in_place mode)
    const redirectResult = await pkceSetItem(
      params.pkceStorageKind,
      'redirect_uri',
      params.redirectUri
    );
    if (!redirectResult.ok) {
      return { status_code: redirectResult.status_code, error: redirectResult.error };
    }

    let authorizationEndpoint;
    try {
      authorizationEndpoint = await this.fetchAuthorizationEndpoint(params.environment);
    } catch (error) {
      return {
        status_code: 400,
        error: isErrorWithMessage(error) ? error.message : 'Could not fetch authorization endpoint',
      };
    }

    const requestMap = {
      client_id: params.clientId,
      scope: params.scope,
      response_type: 'code',
      redirect_uri: params.redirectUri,
      nonce: params.nonce,
      state: params.state,
      code_challenge_method: params.codeChallengeMethod,
      code_challenge: params.codeChallenge,
    };

    const authorizeUrl = IdentityModule.buildAuthorizeUrl(authorizationEndpoint, requestMap);
    window.location.assign(authorizeUrl);

    return {
      status_code: 302,
    };
  }

  /**
   * Performs native in-app OAuth2 authorization using the JSBridge.
   *
   * @param invokeParams - The authorization parameters.
   *
   * @returns The authorization result, including status and authorization code.
   *
   * @internal
   */
  private async performNativeAuthorization(invokeParams: {
    clientId: string;
    actualRedirectUri: string;
    scope: string;
    nonce: string;
    state: string;
    codeChallenge: string;
    codeChallengeMethod: string;
    responseMode: 'redirect' | 'in_place';
  }): Promise<RawAuthorizeResponse> {
    const response = (await this.invoke({
      method: 'authorize',
      params: {
        clientId: invokeParams.clientId,
        redirectUri: invokeParams.actualRedirectUri,
        scope: invokeParams.scope,
        nonce: invokeParams.nonce,
        state: invokeParams.state,
        codeChallenge: invokeParams.codeChallenge,
        codeChallengeMethod: invokeParams.codeChallengeMethod,
        responseMode: invokeParams.responseMode,
      },
    })) as RawAuthorizeResponse;

    const rawResponseError = this.validate(RawAuthorizeResponseSchema, response);
    if (rawResponseError)
      this.logger.warn('authorize', `Unexpected response shape: ${rawResponseError}`);

    return response;
  }

  /**
   * Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
   * This method handles both native in-app consent and web-based fallback flows.
   *
   * @param request - Authorization parameters including client ID, redirect URI, scope, and environment. See {@link AuthorizeRequest}.
   *
   * @returns The authorization result, containing the authorization code on success or redirect status. See {@link AuthorizeResponse}.
   *
   * @remarks
   * **Important Note on redirectUri and responseMode:**
   *
   * The actual `redirectUri` used during authorization may differ from the one you provide,
   * depending on the flow:
   *
   * - `responseMode: 'in_place'` when native flow is available: Uses the current page URL
   *   (normalized) as the `redirectUri`, overriding your provided value
   * - `responseMode: 'in_place'` falling back to web flow if native flow is not available:
   *   Uses your provided `redirectUri`
   * - `responseMode: 'redirect'`: Always uses your provided `redirectUri`
   *
   * On a `200` response (native `in_place` success), the actual `redirectUri` and PKCE values
   * (`codeVerifier`, `nonce`) are returned in `response.result` alongside `code` and `state`,
   * so you do not need to call `getAuthorizationArtifacts()`.
   * For the web redirect flow (`302`), retrieve artifacts from `getAuthorizationArtifacts()` after
   * the redirect round-trip completes.
   *
   * **PKCE storage (`pkceStorage`):**
   *
   * - Defaults to `web_session_storage` (`window.sessionStorage` with the `grabid:` key prefix).
   * - Use `grab_storage` to persist PKCE artifacts via {@link StorageModule} (requires `mobile.storage` scope).
   *   If native storage fails, the error is returned to the caller; there is no automatic fallback.
   *
   * **Consent Selection Rules (Native vs Web):**
   *
   * - If the user agent does not match the Grab app pattern, the SDK uses web consent
   * - If the app version in the user agent is below 5.396.0 (iOS or Android),
   *   the SDK uses web consent
   * - For supported versions, the SDK attempts native consent first and falls back to
   *   web on specific native errors (400, 401, 403)
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { IdentityModule, isSuccess, isRedirection, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the identity module
   * const identity = new IdentityModule();
   *
   * // Initiate authorization with redirect mode
   * const response = await identity.authorize({
   *   clientId: 'your-client-id',
   *   redirectUri: 'https://your-app.com/callback',
   *   scope: 'openid profile',
   *   environment: 'production',
   *   responseMode: 'redirect'
   * });
   *
   * // Handle the response
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
   * } else if (isRedirection(response)) {
   *   console.log('Redirecting to authorization...');
   * } else if (isError(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('Client not authorized for requested scope');
   *       // Check OAuth client configuration and requested scopes
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
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

    const pkceStorageKind = resolvePkceStorage(request.pkceStorage);

    const pkceArtifacts = await this.generatePKCEArtifacts();

    const responseMode = request.responseMode || 'redirect';

    const actualRedirectUri =
      responseMode === 'in_place'
        ? IdentityModule.normalizeUrl(window.location.href)
        : request.redirectUri;

    const storeResult = await this.storePKCEArtifacts(pkceStorageKind, {
      ...pkceArtifacts,
      redirectUri: actualRedirectUri,
    });
    if (!storeResult.ok) {
      return { status_code: storeResult.status_code, error: storeResult.error };
    }

    const invokeParams = {
      clientId: request.clientId,
      redirectUri: request.redirectUri,
      scope: request.scope,
      nonce: pkceArtifacts.nonce,
      state: pkceArtifacts.state,
      codeChallenge: pkceArtifacts.codeChallenge,
      codeChallengeMethod: pkceArtifacts.codeChallengeMethod,
    };

    if (IdentityModule.shouldUseWebConsent(request)) {
      return this.performWebAuthorization({
        ...invokeParams,
        environment: request.environment,
        pkceStorageKind,
      });
    }

    // Always try native consent first, fallback to web consent if unavailable
    // Note: Native respects responseMode; web always redirects
    try {
      const rawNativeResult = await this.performNativeAuthorization({
        ...invokeParams,
        actualRedirectUri,
        responseMode,
      });

      if (rawNativeResult.status_code === 200) {
        return {
          status_code: 200,
          result: {
            code: rawNativeResult.result.code,
            state: rawNativeResult.result.state,
            codeVerifier: pkceArtifacts.codeVerifier,
            nonce: pkceArtifacts.nonce,
            redirectUri: actualRedirectUri,
          },
        };
      }

      // Check if native authorization returned error - fallback to web for specific status codes
      // including server errors (500) and not implemented (501) when native is unavailable
      if (
        rawNativeResult.status_code === 400 ||
        rawNativeResult.status_code === 403 ||
        rawNativeResult.status_code === 500 ||
        rawNativeResult.status_code === 501
      ) {
        console.error(
          `Native authorization returned ${rawNativeResult.status_code}, falling back to web flow:`,
          rawNativeResult.error
        );
        // Fallback to web flow
        return this.performWebAuthorization({
          ...invokeParams,
          environment: request.environment,
          pkceStorageKind,
        });
      }

      return rawNativeResult;
    } catch (error) {
      // Native consent is unavailable, fallback to web flow
      console.error('Native authorization failed, falling back to web flow:', error);
      // Fallback to web flow
      return this.performWebAuthorization({
        ...invokeParams,
        environment: request.environment,
        pkceStorageKind,
      });
    }
  }
}
