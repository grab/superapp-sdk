/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

import { BaseModule } from '../../core/module';
import {
  AuthorizeRequest,
  AuthorizeResponse,
  AuthorizeResult,
  GetAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsResponse,
} from './types';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { extractGrabAppInfoFromUserAgent } from '../../utils/user-agent';

/**
 * JSBridge module for authenticating users via GrabID.
 *
 * @group Modules
 *
 * @remarks
 * Handles OAuth2/OIDC authentication flows with PKCE support, enabling MiniApps to obtain user identity tokens.
 * Supports both native in-app consent and web-based fallback flows.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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

  get NAMESPACE() {
    return 'grabid';
  }

  get CODE_CHALLENGE_METHOD() {
    return 'S256';
  }

  get NONCE_LENGTH() {
    return 16;
  }

  get STATE_LENGTH() {
    return 7;
  }

  get CODE_VERIFIER_LENGTH() {
    return 64;
  }

  get OPENID_CONFIG_ENDPOINTS() {
    return {
      staging:
        'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
      production: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
    };
  }

  async fetchAuthorizationEndpoint(environment) {
    const configUrl = this.OPENID_CONFIG_ENDPOINTS[environment];
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

  static generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i += 1) {
      result += charset.charAt(randomValues[i] % charset.length);
    }
    return result;
  }

  static base64URLEncode(str) {
    return str.toString(Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  static generateCodeVerifier(len) {
    return IdentityModule.base64URLEncode(IdentityModule.generateRandomString(len));
  }

  static generateCodeChallenge(codeVerifier) {
    return IdentityModule.base64URLEncode(sha256(codeVerifier));
  }

  generatePKCEArtifacts() {
    const nonce = IdentityModule.generateRandomString(this.NONCE_LENGTH);
    const state = IdentityModule.generateRandomString(this.STATE_LENGTH);
    const codeVerifier = IdentityModule.generateCodeVerifier(this.CODE_VERIFIER_LENGTH);
    const codeChallenge = IdentityModule.generateCodeChallenge(codeVerifier);

    return {
      nonce,
      state,
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: this.CODE_CHALLENGE_METHOD,
    };
  }

  storePKCEArtifacts(artifacts) {
    this.setStorageItem('nonce', artifacts.nonce);
    this.setStorageItem('state', artifacts.state);
    this.setStorageItem('code_verifier', artifacts.codeVerifier);
    this.setStorageItem('redirect_uri', artifacts.redirectUri);
  }

  /**
   * Retrieves stored PKCE authorization artifacts from local storage.
   * These artifacts are used to complete the OAuth2 authorization code exchange.
   *
   * @returns Resolves with the stored artifacts if all are present (status 200),
   *          no content if none are present (status 204),
   *          or an error if artifacts are inconsistent (status 400).
   *
   * @remarks
   * **Important:** The `redirectUri` returned by this method is the actual redirect URI
   * that was sent to the authorization server. This may differ from the `redirectUri`
   * you provided to `authorize()` if you used `responseMode: 'in_place'` with native flow.
   * You must use this returned `redirectUri` for token exchange to ensure OAuth compliance.
   *
   * @example
   * Retrieve stored authorization artifacts after authorization redirect
   * ```typescript
   * const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();
   *
   * if (status_code === 200 && result) {
   *   // All artifacts present - proceed with token exchange
   *   const { state, codeVerifier, nonce, redirectUri } = result;
   *   console.log('State:', state);
   *   console.log('Code Verifier:', codeVerifier);
   *   console.log('Nonce:', nonce);
   *   console.log('Redirect URI:', redirectUri);
   * } else if (status_code === 204) {
   *   // No artifacts yet - user hasn't authorized
   *   console.log('No authorization artifacts found. Authorization has not been initiated.');
   * } else if (status_code === 400) {
   *   // Inconsistent state - possible data corruption
   *   console.error('Authorization artifacts error:', error);
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
   * @returns Resolves with status 204 when artifacts are cleared successfully.
   *          The result and error fields will always be null for this operation.
   *
   * @example
   * Clear stored authorization artifacts after successful token exchange
   * ```typescript
   * const { status_code } = await identityModule.clearAuthorizationArtifacts();
   * if (status_code === 204) {
   *   console.log('Authorization artifacts cleared');
   * }
   * ```
   *
   * @public
   */
  async clearAuthorizationArtifacts(): Promise<ClearAuthorizationArtifactsResponse> {
    window.localStorage.removeItem(`${this.NAMESPACE}:nonce`);
    window.localStorage.removeItem(`${this.NAMESPACE}:state`);
    window.localStorage.removeItem(`${this.NAMESPACE}:code_verifier`);
    window.localStorage.removeItem(`${this.NAMESPACE}:redirect_uri`);
    window.localStorage.removeItem(`${this.NAMESPACE}:login_return_uri`);

    return Promise.resolve({
      status_code: 204,
      result: null,
      error: null,
    });
  }

  setStorageItem(key, value) {
    window.localStorage.setItem(`${this.NAMESPACE}:${key}`, value);
  }

  getStorageItem(key) {
    return window.localStorage.getItem(`${this.NAMESPACE}:${key}`);
  }

  static normalizeUrl(urlString) {
    const parsedUrl = new URL(urlString);
    return `${parsedUrl.origin}${parsedUrl.pathname}`;
  }

  static buildAuthorizeUrl(authorizationEndpoint, requestMap) {
    const query = Object.entries(requestMap)
      .filter(
        (entry): entry is [string, string | number | boolean] =>
          entry[1] !== undefined && entry[1] !== null
      )
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${authorizationEndpoint}?${query}`;
  }

  static shouldUseWebConsent(request) {
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

  async performWebAuthorization(params): Promise<AuthorizeResponse> {
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
      result: undefined,
      error: undefined,
    });
  }

  async performNativeAuthorization(invokeParams): Promise<AuthorizeResponse> {
    return this.wrappedModule.invoke<AuthorizeResult>('authorize', {
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
   * @returns Resolves when the authorization flow is initiated.
   *          - Status 200: Authorization completed successfully (native in_place flow)
   *          - Status 302: Redirect initiated (web flow or redirect response mode)
   *          - Status 204: User cancelled the authorization
   *          - Status 400/401/403: Authorization failed with error details
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
   * Initiate authorization with redirect mode
   * ```typescript
   * const response = await identityModule.authorize({
   *   clientId: 'your-client-id',
   *   redirectUri: 'https://your-app.com/callback',
   *   scope: 'openid profile',
   *   environment: 'production',
   *   responseMode: 'redirect'
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * const { result, error, status_code } = await identityModule.authorize({
   *   clientId: 'your-client-id',
   *   redirectUri: 'https://your-app.com/callback',
   *   scope: 'openid profile',
   *   environment: 'production',
   *   responseMode: 'redirect'
   * });
   *
   * if (status_code === 200 && result) {
   *   // Authorization successful (in_place mode with native flow)
   *   console.log('Auth Code:', result.code);
   *   console.log('State:', result.state);
   * } else if (status_code === 302) {
   *   // Authorization redirect initiated (web flow or redirect response mode)
   *   // The page will redirect to the authorization server
   * } else if (status_code === 204) {
   *   // User cancelled the authorization
   *   console.log('User cancelled');
   * } else if (error) {
   *   // Authorization failed
   *   console.error('Auth error:', error);
   * }
   * ```
   *
   * @public
   */
  async authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    const validationError = IdentityModule.validateAuthorizeRequest(request);
    if (validationError) {
      return Promise.resolve({ status_code: 400, error: validationError });
    }

    const pkceArtifacts = this.generatePKCEArtifacts();

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
      if (nativeResult.error && [400, 401, 403].includes(nativeResult.status_code)) {
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

  static validateRequiredString(value, fieldName) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return `${fieldName} is required and must be a non-empty string`;
    }
    return null;
  }

  static validateAuthorizeRequest(request) {
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
