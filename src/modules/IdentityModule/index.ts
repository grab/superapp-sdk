/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { normalizeUrl, validateRequiredString } from '../../utils';
import { parseGrabUserAgent, isVersionBelow } from '../../utils/version';
import { buildAuthorizeUrl } from './utils';
import { generateRandomString, generateCodeVerifier, generateCodeChallenge } from './utils';
import type {
  Environment,
  PKCEArtifacts,
  StoredPKCEArtifacts,
  GetAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsResponse,
  WebAuthorizationParams,
  NativeAuthorizationParams,
  AuthorizeRequest,
  ShouldUseWebConsentRequest,
  AuthorizeResponse,
  ResponseMode,
  AuthorizationArtifactsResult,
  AuthorizeResult,
} from './type';
import {
  NAMESPACE,
  CODE_CHALLENGE_METHOD,
  NONCE_LENGTH,
  STATE_LENGTH,
  CODE_VERIFIER_LENGTH,
  OPENID_CONFIG_ENDPOINTS,
  MINIMUM_NATIVE_CONSENT_VERSION,
} from './constants';

/**
 * The IdentityModule provides functionality related to user identity and OAuth authorization flows.
 *
 * This module handles both native and web-based authorization flows with automatic fallback mechanisms.
 * It manages PKCE (Proof Key for Code Exchange) artifacts and supports different response modes for flexibility.
 *
 * @example
 * ```javascript
 * import { IdentityModule } from "@grabjs/superapp-sdk";
 *
 * // Ideally, initialize this only once and reuse across app.
 * const identityModule = new IdentityModule();
 * ```
 */
class IdentityModule extends ModuleBase {
  constructor() {
    super('IdentityModule');
  }

  /** @internal */
  private async fetchAuthorizationEndpoint(environment: Environment): Promise<string> {
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

      const config = (await response.json()) as { authorization_endpoint?: string };
      if (!config.authorization_endpoint) {
        console.error('authorization_endpoint not found in OpenID configuration response');
        throw new Error('Invalid authorization configuration');
      }

      return config.authorization_endpoint;
    } catch (error) {
      console.error('Error fetching authorization endpoint:', error);

      if (
        error instanceof Error &&
        (error.message === 'Failed to fetch authorization configuration' ||
          error.message === 'Invalid authorization configuration')
      ) {
        throw error;
      }

      throw new Error('Something wrong happened when fetching authorization configuration');
    }
  }

  /** @internal */
  private generatePKCEArtifacts(): PKCEArtifacts {
    const nonce = generateRandomString(NONCE_LENGTH);
    const state = generateRandomString(STATE_LENGTH);
    const codeVerifier = generateCodeVerifier(CODE_VERIFIER_LENGTH);
    const codeChallenge = generateCodeChallenge(codeVerifier);

    return {
      nonce,
      state,
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: CODE_CHALLENGE_METHOD,
    };
  }

  /** @internal */
  private storePKCEArtifacts(artifacts: StoredPKCEArtifacts): void {
    this.setStorageItem('nonce', artifacts.nonce);
    this.setStorageItem('state', artifacts.state);
    this.setStorageItem('code_verifier', artifacts.codeVerifier);
    this.setStorageItem('redirect_uri', artifacts.redirectUri);
  }

  /** @internal */
  private setStorageItem(key: string, value: string): void {
    window.localStorage.setItem(`${NAMESPACE}:${key}`, value);
  }

  /** @internal */
  private getStorageItem(key: string): string | null {
    return window.localStorage.getItem(`${NAMESPACE}:${key}`);
  }

  /** @internal */
  private static shouldUseWebConsent(request: ShouldUseWebConsentRequest): boolean {
    const userAgentInfo = parseGrabUserAgent(window.navigator.userAgent);
    if (!userAgentInfo) {
      return true;
    }

    if (request.environment === 'staging') {
      return false;
    }

    return isVersionBelow(userAgentInfo, MINIMUM_NATIVE_CONSENT_VERSION);
  }

  /** @internal */

  private async performWebAuthorization(
    params: WebAuthorizationParams
  ): Promise<AuthorizeResponse> {
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
        error: error instanceof Error ? error.message : String(error),
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

    const authorizeUrl = buildAuthorizeUrl(authorizationEndpoint, requestMap);
    window.location.assign(authorizeUrl);

    // Return a special response indicating redirect is happening
    return Promise.resolve({
      status_code: 302,
      result: undefined,
      error: undefined,
    });
  }

  /** @internal */
  private static performNativeAuthorization(
    invokeParams: NativeAuthorizationParams
  ): Promise<AuthorizeResponse> {
    return window.WrappedIdentityModule.invoke('authorize', {
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

  /** @internal */
  private static validateAuthorizeRequest(request: AuthorizeRequest): string | null {
    if (request === null || request === undefined) {
      return 'request is required';
    }

    if (typeof request !== 'object') {
      return 'request must be an object';
    }

    const scopeError = validateRequiredString(request.scope, 'scope');
    if (scopeError) {
      return scopeError;
    }

    const clientIdError = validateRequiredString(request.clientId, 'clientId');
    if (clientIdError) {
      return clientIdError;
    }

    const redirectUriError = validateRequiredString(request.redirectUri, 'redirectUri');
    if (redirectUriError) {
      return redirectUriError;
    }

    try {
      const url = new URL(request.redirectUri);
      if (!url) {
        return 'redirectUri must be a valid URL';
      }
    } catch {
      return 'redirectUri must be a valid URL';
    }

    const environmentError = validateRequiredString(request.environment, 'environment');
    if (environmentError) {
      return environmentError;
    }

    if (request.environment !== 'staging' && request.environment !== 'production') {
      return "environment must be either 'staging' or 'production'";
    }

    return null;
  }

  /**
   * Initiates the OAuth authorization flow with support for both native and web consent.
   *
   * @remarks
   * **Important Note on `redirectUri` and `responseMode`:**
   *
   * The actual `redirectUri` used during authorization may differ from the one you provide, depending on the flow:
   * - **`responseMode: 'in_place'` when native flow is available**: Uses the current page URL (normalized) as the `redirectUri`, overriding your provided value
   * - **`responseMode: 'in_place'` falling back to web flow if native flow is not available**: Uses your provided `redirectUri`
   * - **`responseMode: 'redirect'`**: Always uses your provided `redirectUri`
   *
   * To ensure successful token exchange (which requires matching `redirectUri` values), **always retrieve the actual `redirectUri` from {@link getAuthorizationArtifacts}** after authorization completes.
   *
   * **Consent Selection Rules (Native vs Web):**
   * - If the user agent does not match the Grab app pattern, the SDK uses **web consent**.
   * - If `environment` is `staging`, the SDK **skips version gating** and attempts native consent.
   * - Otherwise, if the app version in the user agent is below **5.396.0** (iOS or Android), the SDK uses **web consent**.
   * - For supported versions, the SDK attempts **native consent** first and falls back to web on specific native errors.
   *
   * **Status Codes:**
   * - `200`: Authorization successful (in_place mode with native flow)
   * - `302`: Authorization redirect initiated (web flow or redirect response mode)
   * - `204`: User cancelled the authorization
   * - `400`: Invalid request or configuration error
   *
   * @param request - Authorization request parameters.
   *   - `clientId`: Client ID for authorization (required)
   *   - `scope`: Scope of the authorization (required)
   *   - `redirectUri`: Redirect URI for authorization callback (required)
   *   - `environment`: Environment ('staging' or 'production'). Used to fetch the authorization endpoint from the OpenID configuration for the web flow (required)
   *   - `responseMode`: Response mode ('redirect' or 'in_place'). Defaults to 'redirect' if not specified (optional)
   *
   * @returns Promise that resolves to {@link AuthorizeResponse}.
   *
   * @see {@link Environment}, {@link ResponseMode}
   *
   * @example
   * ```javascript
   * // Example 1: Using redirect response mode
   * const request = {
   *   clientId: "your-client-id",
   *   scope: "profile openid",
   *   redirectUri: "https://your-redirect-uri.com",
   *   environment: "production", // or "staging"
   *   responseMode: "redirect"
   * };
   *
   * const { result, error, status_code } = await identityModule.authorize(request);
   * if (status_code === 200 && result) {
   *   // Authorization successful (in_place mode with native flow)
   *   console.log("Auth Code:", result.code);
   *   console.log("State:", result.state);
   * } else if (status_code === 302) {
   *   // Authorization redirect initiated (web flow or redirect response mode)
   *   // The page will redirect to the authorization server
   * } else if (status_code === 204) {
   *   // User cancelled the authorization
   *   console.log("User cancelled");
   * } else if (error) {
   *   // Authorization failed
   *   console.error("Auth error:", error);
   * }
   *
   * // Example 2: Using in_place response mode
   * const inPlaceRequest = {
   *   clientId: "your-client-id",
   *   scope: "profile openid",
   *   redirectUri: "https://your-redirect-uri.com",
   *   environment: "production",
   *   responseMode: "in_place"
   * };
   *
   * const response = await identityModule.authorize(inPlaceRequest);
   * if (response.status_code === 200 && response.result) {
   *   // Get the actual redirectUri used
   *   const { redirectUri } = await identityModule.getAuthorizationArtifacts();
   *   console.log("Actual redirect URI:", redirectUri);
   * }
   * ```
   */
  async authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    const validationError = IdentityModule.validateAuthorizeRequest(request);
    if (validationError) {
      return Promise.resolve({ status_code: 400, error: validationError });
    }

    const pkceArtifacts = this.generatePKCEArtifacts();

    const responseMode = request.responseMode || 'redirect';

    const actualRedirectUri =
      responseMode === 'in_place' ? normalizeUrl(window.location.href) : request.redirectUri;

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
      const nativeResult = await IdentityModule.performNativeAuthorization({
        ...invokeParams,
        actualRedirectUri,
        responseMode,
      });

      // Check if native authorization returned error - only fallback to web for specific status codes
      if (
        nativeResult.error &&
        nativeResult.status_code &&
        [400, 401, 403].includes(nativeResult.status_code)
      ) {
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
   * Retrieves the authorization artifacts that were stored in localStorage during the authorization flow.
   *
   * @remarks
   * These artifacts include PKCE (Proof Key for Code Exchange) values and the actual `redirectUri` that was used.
   * These values are needed to complete the OAuth token exchange after the authorization redirect.
   *
   * **Important:** The `redirectUri` returned by this method is the **actual** redirect URI that was sent to the authorization server.
   * This may differ from the `redirectUri` you provided to {@link authorize} if you used `responseMode: 'in_place'` with native flow.
   * You **must** use this returned `redirectUri` for token exchange to ensure OAuth compliance.
   *
   * **Status Codes:**
   * - `200`: All four artifacts are present and returned in `result`
   * - `204`: No artifacts are stored (authorization has not been called yet)
   * - `400`: Inconsistent state detected (only some artifacts present, possible data corruption)
   *
   * @returns Promise that resolves to {@link GetAuthorizationArtifactsResponse} with stored artifacts.
   *
   * @example
   * ```javascript
   * // After authorization redirect, retrieve the stored artifacts
   * const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();
   *
   * if (status_code === 200 && result) {
   *   // All artifacts present - proceed with token exchange
   *   const { state, codeVerifier, nonce, redirectUri } = result;
   *   console.log("State:", state);
   *   console.log("Code Verifier:", codeVerifier);
   *   console.log("Nonce:", nonce);
   *   console.log("Redirect URI:", redirectUri);
   *
   *   // Use these values for token exchange
   *   await exchangeToken({
   *     code: authCode,
   *     codeVerifier,
   *     redirectUri, // Use the actual redirectUri from artifacts
   *   });
   * } else if (status_code === 204) {
   *   // No artifacts yet - user hasn't authorized
   *   console.log("No authorization artifacts found.");
   * } else if (status_code === 400) {
   *   // Inconsistent state - possible data corruption
   *   console.error("Authorization artifacts error:", error);
   * }
   * ```
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
   * Clears all stored authorization artifacts from localStorage.
   *
   * @remarks
   * This should be called after a successful token exchange or when you need to reset the authorization state
   * (e.g., on error or logout).
   *
   * **Status Codes:**
   * - `204`: No Content - successful operation
   *
   * @returns Promise that resolves to {@link ClearAuthorizationArtifactsResponse} with status code 204.
   *
   * @example
   * ```javascript
   * // After successful token exchange
   * const { status_code } = await identityModule.clearAuthorizationArtifacts();
   * if (status_code === 204) {
   *   console.log("Authorization artifacts cleared successfully");
   * }
   *
   * // On error or logout
   * try {
   *   await exchangeToken(params);
   * } catch (error) {
   *   console.error("Token exchange failed:", error);
   *   // Clear artifacts to reset state
   *   await identityModule.clearAuthorizationArtifacts();
   * }
   * ```
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
}

export default IdentityModule;

export type {
  // Authorize
  AuthorizeRequest,
  Environment,
  ResponseMode,
  AuthorizeResponse,
  AuthorizeResult,

  // GetAuthorizationArtifacts
  GetAuthorizationArtifactsResponse,
  AuthorizationArtifactsResult,

  // ClearAuthorizationArtifacts
  ClearAuthorizationArtifactsResponse,
};
