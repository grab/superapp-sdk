/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { isResponseError } from '../../core/response';
import {
  AuthorizeRequest,
  AuthorizeResponse,
  GetAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsResponse,
} from './types';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { extractGrabAppInfoFromUserAgent } from '../../utils/user-agent';
import {
  generateRandomString,
  generateCodeVerifier,
  generateCodeChallenge,
} from '../../utils/crypto';
import {
  NAMESPACE,
  CODE_CHALLENGE_METHOD,
  NONCE_LENGTH,
  STATE_LENGTH,
  CODE_VERIFIER_LENGTH,
  OPENID_CONFIG_ENDPOINTS,
} from './constants';

/**
 * JSBridge module for authenticating users via GrabID.
 *
 * @group Modules
 *
 * @remarks
 * Handles OAuth2/OIDC authentication flows with PKCE support, enabling MiniApps to obtain user identity tokens.
 * Supports both native in-app consent and web-based fallback flows.
 * This code must run on the Grab SuperApp's webview to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const identity = new SuperAppSDK.IdentityModule();
 * </script>
 * ```
 *
 * @public
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
   *
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
        throw new Error('Failed to fetch authorization configuration');
      }

      const config = await response.json();
      if (!config.authorization_endpoint) {
        console.error('authorization_endpoint not found in OpenID configuration response');
        throw new Error('Invalid authorization configuration');
      }

      return config.authorization_endpoint;
    } catch (error) {
      console.error('Error fetching authorization endpoint:', error);

      if (
        error.message === 'Failed to fetch authorization configuration' ||
        error.message === 'Invalid authorization configuration'
      ) {
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
  private async generatePKCEArtifacts() {
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
   * Stores PKCE artifacts in local storage for later retrieval during token exchange.
   *
   * @param artifacts - The PKCE artifacts to store, including nonce, state, code verifier, and redirect URI.
   *
   * @internal
   */
  private storePKCEArtifacts(artifacts: {
    nonce: string;
    state: string;
    codeVerifier: string;
    redirectUri: string;
  }): void {
    this.setStorageItem('nonce', artifacts.nonce);
    this.setStorageItem('state', artifacts.state);
    this.setStorageItem('code_verifier', artifacts.codeVerifier);
    this.setStorageItem('redirect_uri', artifacts.redirectUri);
  }

  /**
   * Retrieves stored PKCE authorization artifacts from local storage.
   * These artifacts are used to complete the OAuth2 authorization code exchange.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: All artifacts present - proceed with token exchange
   * - `204`: No artifacts yet - user hasn't authorized
   * - `400`: Inconsistent state - possible data corruption
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
   * // Imports using ES Module built
   * import { IdentityModule, isResponseOk, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { IdentityModule, isResponseOk, isResponseNoContent, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the identity module
   * const identityModule = new IdentityModule();
   *
   * // Retrieve stored authorization artifacts after authorization redirect
   * try {
   *   const response = await identityModule.getAuthorizationArtifacts();
   *
   *   if (isResponseError(response)) {
   *     // Inconsistent state - possible data corruption
   *     console.error('Authorization artifacts error:', response.error);
   *   } else if (isResponseOk(response)) {
   *     // All artifacts present - proceed with token exchange
   *     const { state, codeVerifier, nonce, redirectUri } = response.result;
   *     console.log('State:', state);
   *     console.log('Code Verifier:', codeVerifier);
   *     console.log('Nonce:', nonce);
   *     console.log('Redirect URI:', redirectUri);
   *   } else if (isResponseNoContent(response)) {
   *     // No artifacts yet - user hasn't authorized
   *     console.log('No authorization artifacts found. Authorization has not been initiated.');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  async getAuthorizationArtifacts(): Promise<GetAuthorizationArtifactsResponse> {
    const state = this.getStorageItem('state');
    const codeVerifier = this.getStorageItem('code_verifier');
    const nonce = this.getStorageItem('nonce');
    const redirectUri = this.getStorageItem('redirect_uri');

    const existingCount = [state, codeVerifier, nonce, redirectUri].filter(
      (item) => item !== null
    ).length;

    if (existingCount === 4) {
      return Promise.resolve({
        status_code: 200,
        result: { state, codeVerifier, nonce, redirectUri },
        error: null,
      });
    }

    if (existingCount === 0) {
      return Promise.resolve({
        status_code: 204,
        result: null,
        error: null,
      });
    }

    return Promise.resolve({
      status_code: 400,
      result: null,
      error: 'Inconsistent authorization artifacts in storage',
    });
  }

  /**
   * Clears all stored PKCE authorization artifacts from local storage.
   * This should be called after a successful token exchange or when you need to
   * reset the authorization state (e.g., on error or logout).
   *
   * @returns A promise that resolves to a `204` status code when artifacts are cleared.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { IdentityModule, isResponseNoContent } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { IdentityModule, isResponseNoContent } = window.SuperAppSDK;
   *
   * // Initialize the identity module
   * const identityModule = new IdentityModule();
   *
   * // Clear stored authorization artifacts after successful token exchange
   * try {
   *   const response = await identityModule.clearAuthorizationArtifacts();
   *
   *   if (isResponseNoContent(response)) {
   *     console.log('Authorization artifacts cleared');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  async clearAuthorizationArtifacts(): Promise<ClearAuthorizationArtifactsResponse> {
    window.localStorage.removeItem(`${NAMESPACE}:nonce`);
    window.localStorage.removeItem(`${NAMESPACE}:state`);
    window.localStorage.removeItem(`${NAMESPACE}:code_verifier`);
    window.localStorage.removeItem(`${NAMESPACE}:redirect_uri`);
    window.localStorage.removeItem(`${NAMESPACE}:login_return_uri`);

    return Promise.resolve({
      status_code: 204,
      result: null,
      error: null,
    });
  }

  /**
   * Stores a value in local storage with the GrabID namespace prefix.
   *
   * @param key - The storage key (without namespace prefix).
   * @param value - The value to store.
   *
   * @internal
   */
  private setStorageItem(key: string, value: string): void {
    window.localStorage.setItem(`${NAMESPACE}:${key}`, value);
  }

  /**
   * Retrieves a value from local storage with the GrabID namespace prefix.
   *
   * @param key - The storage key (without namespace prefix).
   * @returns The stored value or null if not found.
   *
   * @internal
   */
  private getStorageItem(key: string): string | null {
    return window.localStorage.getItem(`${NAMESPACE}:${key}`);
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
    const grabAppInfo = extractGrabAppInfoFromUserAgent();
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
   * @returns A promise that resolves to a 302 redirect response or a 400 error response.
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
    this.setStorageItem('login_return_uri', window.location.href);

    // Update the stored redirectUri to match what will be sent to the authorization server
    // This is necessary when falling back from native flow, where the initially stored
    // redirectUri might have been the normalized current URL (for in_place mode)
    this.setStorageItem('redirect_uri', params.redirectUri);

    let authorizationEndpoint;
    try {
      authorizationEndpoint = await this.fetchAuthorizationEndpoint(params.environment);
    } catch (error) {
      return Promise.resolve({
        status_code: 400,
        error: error.message,
        result: undefined,
      });
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

    return Promise.resolve({
      status_code: 302,
      result: null,
    });
  }

  /**
   * Performs native in-app OAuth2 authorization using the JSBridge.
   *
   * @param invokeParams - The authorization parameters.
   * @returns A promise that resolves to the native authorization response.
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
  }): Promise<AuthorizeResponse> {
    return this.wrappedModule.invoke('authorize', {
      clientId: invokeParams.clientId,
      redirectUri: invokeParams.actualRedirectUri,
      scope: invokeParams.scope,
      nonce: invokeParams.nonce,
      state: invokeParams.state,
      codeChallenge: invokeParams.codeChallenge,
      codeChallengeMethod: invokeParams.codeChallengeMethod,
      responseMode: invokeParams.responseMode,
    });
  }

  /**
   * Initiates an OAuth2 authorization flow with PKCE (Proof Key for Code Exchange).
   * This method handles both native in-app consent and web-based fallback flows.
   *
   * @param request - The authorization request parameters including client ID, redirect URI,
   *                  scopes, and environment.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Authorization completed successfully (native in_place flow)
   * - `302`: Redirect in progress (web redirect flow). The page will
   *   be redirected to the authorization URL. This response has no result data.
   * - `400`: Missing required OAuth parameters, redirect mismatch, or no webview URL
   *
   * @throws Error when the JSBridge method fails unexpectedly.
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
   * always retrieve the actual `redirectUri` from `getAuthorizationArtifacts()`
   * after authorization completes.
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
   * // Imports using ES Module built
   * import { IdentityModule, isResponseOk, isResponseError, isResponseRedirect } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { IdentityModule, isResponseOk, isResponseError, isResponseRedirect } = window.SuperAppSDK;
   *
   * // Initialize the identity module
   * const identityModule = new IdentityModule();
   *
   * // Initiate authorization with redirect mode
   * try {
   *   const response = await identityModule.authorize({
   *     clientId: 'your-client-id',
   *     redirectUri: 'https://your-app.com/callback',
   *     scope: 'openid profile',
   *     environment: 'production',
   *     responseMode: 'redirect'
   *   });
   *
   *   if (isResponseError(response)) {
   *     // Authorization failed
   *     console.error('Auth error:', response.error);
   *   } else if (isResponseOk(response)) {
   *     // Authorization successful (in_place mode with native flow)
   *     console.log('Auth Code:', response.result.code);
   *     console.log('State:', response.result.state);
   *   } else if (isResponseRedirect(response)) {
   *     // Redirect in progress (web flow with responseMode: 'redirect')
   *     // The page will be redirected to the authorization URL
   *     console.log('Redirecting to authorization...');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  async authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    const validationError = IdentityModule.validateAuthorizeRequest(request);
    if (validationError) {
      return Promise.resolve({ status_code: 400, result: undefined, error: validationError });
    }

    const pkceArtifacts = await this.generatePKCEArtifacts();

    const responseMode = request.responseMode || 'redirect';

    const actualRedirectUri =
      responseMode === 'in_place'
        ? IdentityModule.normalizeUrl(window.location.href)
        : request.redirectUri;

    this.storePKCEArtifacts({
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

      // Check if native authorization returned error - only fallback to web for specific status codes
      if (isResponseError(nativeResult) && [400, 401, 403].includes(nativeResult.status_code)) {
        console.error(
          `Native authorization returned ${nativeResult.status_code}, falling back to web flow:`,
          nativeResult.error
        );
        // Fallback to web flow
        return this.performWebAuthorization({
          ...invokeParams,
          environment: request.environment,
        });
      }

      return nativeResult;
    } catch (error) {
      // Native consent is unavailable, fallback to web flow
      console.error('Native authorization failed, falling back to web flow:', error);
      // Fallback to web flow
      return this.performWebAuthorization({
        ...invokeParams,
        environment: request.environment,
      });
    }
  }

  /**
   * Validates that a required string field is present and non-empty.
   *
   * @param value - The value to validate.
   * @param fieldName - The name of the field being validated (for error messages).
   * @returns An error message string if invalid, null if valid.
   *
   * @internal
   */
  private static validateRequiredString(value: unknown, fieldName: string): string | null {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return `${fieldName} is required and must be a non-empty string`;
    }
    return null;
  }

  /**
   * Validates the authorization request parameters.
   *
   * @param request - The authorization request to validate.
   * @returns An error message string if invalid, null if valid.
   *
   * @internal
   */
  private static validateAuthorizeRequest(
    request: AuthorizeRequest | null | undefined
  ): string | null {
    if (request == null) {
      return 'request is required';
    }

    const scopeError = IdentityModule.validateRequiredString(request.scope, 'scope');
    if (scopeError) return scopeError;

    const clientIdError = IdentityModule.validateRequiredString(request.clientId, 'clientId');
    if (clientIdError) return clientIdError;

    const redirectUriError = IdentityModule.validateRequiredString(
      request.redirectUri,
      'redirectUri'
    );
    if (redirectUriError) return redirectUriError;

    try {
      const url = new URL(request.redirectUri);
      if (!url) {
        return 'redirectUri must be a valid URL';
      }
    } catch {
      return 'redirectUri must be a valid URL';
    }

    const environmentError = IdentityModule.validateRequiredString(
      request.environment,
      'environment'
    );
    if (environmentError) return environmentError;

    if (request.environment !== 'staging' && request.environment !== 'production') {
      return "environment must be either 'staging' or 'production'";
    }

    return null;
  }
}
