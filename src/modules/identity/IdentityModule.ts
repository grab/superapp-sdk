/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { safeParse } from 'valibot';

import { BaseModule } from '../../core';
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateRandomString,
} from '../../utils/crypto';
import { isErrorWithMessage } from '../../utils/error';
import { detectGrabApp } from '../../utils/platform';
import { formatIssues } from '../../utils/schema';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { StorageModule } from '../storage';
import {
  CODE_CHALLENGE_METHOD,
  CODE_VERIFIER_LENGTH,
  NONCE_LENGTH,
  OPENID_CONFIG_ENDPOINTS,
  STATE_LENGTH,
  STORAGE_KEYS,
  type StorageKey,
} from './constants';
import { AuthorizationConfigurationError } from './errors';
import { buildAuthorizeUrl, buildStorageKey, normalizeUrl } from './helpers';
import {
  AuthorizeRequestSchema,
  AuthorizeResponseSchema,
  RawNativeAuthorizeResponseSchema,
} from './schemas';
import {
  AuthorizeRequest,
  AuthorizeResponse,
  ClearAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsResponse,
  RawNativeAuthorizeResponse,
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
  private readonly storageModule = new StorageModule();

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
        this.logger.error(
          'fetchAuthorizationEndpoint',
          `Failed to fetch OpenID configuration from ${configUrl}: ${response.status} ${response.statusText}`
        );
        throw new AuthorizationConfigurationError('Failed to fetch authorization configuration');
      }

      const config = (await response.json()) as { authorization_endpoint: string };
      if (!config.authorization_endpoint) {
        this.logger.error(
          'fetchAuthorizationEndpoint',
          'authorization_endpoint not found in OpenID configuration response'
        );
        throw new AuthorizationConfigurationError('Invalid authorization configuration');
      }

      return config.authorization_endpoint;
    } catch (error) {
      this.logger.error(
        'fetchAuthorizationEndpoint',
        `Error fetching authorization endpoint: ${isErrorWithMessage(error) ? error.message : String(error)}`
      );

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
   * Stores PKCE artifacts in session storage and mirrors them to native storage when available.
   *
   * @param artifacts - The PKCE artifacts to store, including nonce, state, code verifier, and redirect URI.
   *
   * @internal
   */
  private async storePKCEArtifacts(artifacts: {
    nonce: string;
    state: string;
    codeVerifier: string;
    redirectUri: string;
  }): Promise<void> {
    await Promise.all([
      this.setStorageItem(STORAGE_KEYS.nonce, artifacts.nonce),
      this.setStorageItem(STORAGE_KEYS.state, artifacts.state),
      this.setStorageItem(STORAGE_KEYS.codeVerifier, artifacts.codeVerifier),
      this.setStorageItem(STORAGE_KEYS.redirectUri, artifacts.redirectUri),
    ]);
  }

  /**
   * Retrieves stored PKCE authorization artifacts from session storage (with native fallback).
   * These artifacts are used to complete the OAuth2 authorization code exchange.
   *
   * @returns The stored PKCE artifacts including state, code verifier, nonce, and redirect URI. See {@link GetAuthorizationArtifactsResponse}.
   *
   * @remarks
   * **Important:** The `redirectUri` returned by this method is the actual redirect URI
   * that was sent to the authorization server. This may differ from the `redirectUri`
   * you provided to `authorize()` if you used `responseMode: 'in_place'` with native flow.
   * You must use this returned `redirectUri` for token exchange to ensure OAuth compliance.
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
  async getAuthorizationArtifacts(): Promise<GetAuthorizationArtifactsResponse> {
    const [state, codeVerifier, nonce, redirectUri] = await Promise.all([
      this.getStorageItem(STORAGE_KEYS.state),
      this.getStorageItem(STORAGE_KEYS.codeVerifier),
      this.getStorageItem(STORAGE_KEYS.nonce),
      this.getStorageItem(STORAGE_KEYS.redirectUri),
    ]);

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
   * Clears all stored PKCE authorization artifacts from session storage and native storage (best-effort).
   * This should be called after a successful token exchange or when you need to
   * reset the authorization state (e.g., on error or logout).
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
  async clearAuthorizationArtifacts(): Promise<ClearAuthorizationArtifactsResponse> {
    await Promise.allSettled([
      this.removeStorageItem(STORAGE_KEYS.nonce),
      this.removeStorageItem(STORAGE_KEYS.state),
      this.removeStorageItem(STORAGE_KEYS.codeVerifier),
      this.removeStorageItem(STORAGE_KEYS.redirectUri),
      this.removeStorageItem(STORAGE_KEYS.loginReturnUri),
    ]);

    return {
      status_code: 204,
    };
  }

  /**
   * Writes a key to session storage and mirrors it to native storage (best-effort).
   *
   * @param key - The storage key (without namespace prefix).
   * @param value - The value to store.
   *
   * @internal
   */
  private async setStorageItem(key: StorageKey, value: string): Promise<void> {
    this.setWebStorageItem(key, value);
    await this.setNativeStorageItem(key, value);
  }

  /**
   * Reads a key from session storage, then from native storage if missing.
   *
   * @param key - The storage key (without namespace prefix).
   * @returns The stored value or null if not found.
   *
   * @internal
   */
  private async getStorageItem(key: StorageKey): Promise<string | null> {
    const fromWeb = this.getWebStorageItem(key);
    if (fromWeb !== null) return fromWeb;
    return this.getNativeStorageItem(key);
  }

  /**
   * Removes a key from session storage and native storage (best-effort).
   *
   * @param key - The storage key (without namespace prefix).
   *
   * @internal
   */
  private async removeStorageItem(key: StorageKey): Promise<void> {
    this.removeWebStorageItem(key);
    await this.removeNativeStorageItem(key);
  }

  /**
   * Persists a namespaced key in the WebView session store.
   *
   * @param key - The storage key (without namespace prefix).
   * @param value - The value to store.
   *
   * @internal
   */
  private setWebStorageItem(key: StorageKey, value: string): void {
    window.sessionStorage.setItem(buildStorageKey(key), value);
  }

  /**
   * Reads a namespaced key from the WebView session store.
   *
   * @param key - The storage key (without namespace prefix).
   * @returns The stored value or null if not found.
   *
   * @internal
   */
  private getWebStorageItem(key: StorageKey): string | null {
    return window.sessionStorage.getItem(buildStorageKey(key));
  }

  /**
   * Removes a namespaced key from the WebView session store.
   *
   * @param key - The storage key (without namespace prefix).
   *
   * @internal
   */
  private removeWebStorageItem(key: StorageKey): void {
    window.sessionStorage.removeItem(buildStorageKey(key));
  }

  /**
   * Mirrors a namespaced key to native string storage (best-effort).
   *
   * @param key - The storage key (without namespace prefix).
   * @param value - The value to store.
   *
   * @internal
   */
  private async setNativeStorageItem(key: StorageKey, value: string): Promise<void> {
    await this.storageModule.setString(buildStorageKey(key), value);
  }

  /**
   * Reads a namespaced key from native string storage.
   *
   * @param key - The storage key (without namespace prefix).
   * @returns The stored value or null when not present or not available.
   *
   * @internal
   */
  private async getNativeStorageItem(key: StorageKey): Promise<string | null> {
    const response = await this.storageModule.getString(buildStorageKey(key));
    return response.status_code === 200 ? response.result : null;
  }

  /**
   * Removes a namespaced key from native storage (best-effort).
   *
   * @param key - The storage key (without namespace prefix).
   *
   * @internal
   */
  private async removeNativeStorageItem(key: StorageKey): Promise<void> {
    await this.storageModule.remove(buildStorageKey(key));
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
  }): Promise<AuthorizeResponse> {
    // Store the current page URL for potential return navigation
    await this.setStorageItem(STORAGE_KEYS.loginReturnUri, window.location.href);

    // Update the stored redirectUri to match what will be sent to the authorization server
    // This is necessary when falling back from native flow, where the initially stored
    // redirectUri might have been the normalized current URL (for in_place mode)
    await this.setStorageItem(STORAGE_KEYS.redirectUri, params.redirectUri);

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

    const authorizeUrl = buildAuthorizeUrl(authorizationEndpoint, requestMap);
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
   * @returns The raw native bridge response (the success payload omits PKCE fields until merged in `authorize()`).
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
  }): Promise<RawNativeAuthorizeResponse> {
    const bridgeResponse = await this.invoke({
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
    });

    const parsed = safeParse(RawNativeAuthorizeResponseSchema, bridgeResponse);
    if (!parsed.success) {
      this.logger.warn(
        'authorize',
        `Unexpected native authorize response shape: ${formatIssues(parsed.issues)}`
      );
      return bridgeResponse as RawNativeAuthorizeResponse;
    }

    return parsed.output;
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
   * To ensure successful token exchange (which requires matching `redirectUri` values),
   * use the `redirectUri` on the `authorize()` success result when `status_code` is `200`,
   * or retrieve it from `getAuthorizationArtifacts()` after authorization completes
   * (for example after a web redirect).
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
   *     case 200:
   *       console.log('Auth Code:', response.result.code);
   *       console.log('State:', response.result.state);
   *       console.log('Code verifier (token exchange):', response.result.codeVerifier);
   *       console.log('Nonce:', response.result.nonce);
   *       console.log('Redirect URI used:', response.result.redirectUri);
   *       break;
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

    const pkceArtifacts = await this.generatePKCEArtifacts();

    const responseMode = request.responseMode || 'redirect';

    const actualRedirectUri =
      responseMode === 'in_place' ? normalizeUrl(window.location.href) : request.redirectUri;

    await this.storePKCEArtifacts({
      ...pkceArtifacts,
      redirectUri: actualRedirectUri,
    });

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
      });
    }

    // Always try native consent first, fallback to web consent if unavailable
    // Note: Native respects responseMode; web always redirects
    try {
      const nativeResult = await this.performNativeAuthorization({
        ...invokeParams,
        actualRedirectUri,
        responseMode,
      });

      // Check if native authorization returned error - fallback to web for specific status codes
      // including server errors (500) and not implemented (501) when native is unavailable
      if (
        nativeResult.status_code === 400 ||
        nativeResult.status_code === 403 ||
        nativeResult.status_code === 500 ||
        nativeResult.status_code === 501
      ) {
        const detail =
          'error' in nativeResult && typeof nativeResult.error === 'string'
            ? `: ${nativeResult.error}`
            : '';
        this.logger.error(
          'authorize',
          `Native authorization returned ${nativeResult.status_code}, falling back to web flow${detail}`
        );
        // Fallback to web flow
        return this.performWebAuthorization({
          ...invokeParams,
          environment: request.environment,
        });
      }

      let responseToReturn: AuthorizeResponse;
      if (nativeResult.status_code === 200 && nativeResult.result) {
        responseToReturn = {
          status_code: 200,
          result: {
            code: nativeResult.result.code,
            state: nativeResult.result.state,
            codeVerifier: pkceArtifacts.codeVerifier,
            nonce: pkceArtifacts.nonce,
            redirectUri: actualRedirectUri,
          },
        };
      } else {
        responseToReturn = nativeResult as AuthorizeResponse;
      }

      const responseError = this.validate(AuthorizeResponseSchema, responseToReturn);
      if (responseError)
        this.logger.warn('authorize', `Unexpected response shape: ${responseError}`);

      return responseToReturn;
    } catch (error) {
      // Native consent is unavailable, fallback to web flow
      this.logger.error(
        'authorize',
        `Native authorization failed, falling back to web flow: ${
          isErrorWithMessage(error) ? error.message : String(error)
        }`
      );
      // Fallback to web flow
      return this.performWebAuthorization({
        ...invokeParams,
        environment: request.environment,
      });
    }
  }
}
