/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule, logger } from '../../core';
import {
  normalizeUrl,
  validateRequiredString,
  validateUrl,
  validateObject,
  parseGrabUserAgent,
  isVersionBelow,
  getErrorMessage,
  getErrorForLog,
} from '../../utils';
import {
  buildAuthorizeUrl,
  generateRandomString,
  generateCodeVerifier,
  generateCodeChallenge,
} from './utils';
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
} from './types';
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
 * Provides functionality related to user identity and OAuth authorization flows.
 *
 * @remarks
 * This module handles both native and web-based authorization flows with automatic fallback mechanisms.
 * It manages PKCE (Proof Key for Code Exchange) artifacts and supports different response modes for flexibility.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { IdentityModule } from '@grabjs/superapp-sdk';
 *
 * const identityModule = new IdentityModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const identityModule = new SuperAppSDK.IdentityModule();
 * </script>
 * ```
 */
class IdentityModule extends BaseModule {
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
        logger.error(
          `Failed to fetch OpenID configuration from ${configUrl}: ${response.status} ${response.statusText}`,
          'IdentityModule'
        );
        throw new Error('Failed to fetch authorization configuration');
      }

      const config = (await response.json()) as { authorization_endpoint?: string };
      if (!config.authorization_endpoint) {
        logger.error(
          'authorization_endpoint not found in OpenID configuration response',
          'IdentityModule'
        );
        throw new Error('Invalid authorization configuration');
      }

      return config.authorization_endpoint;
    } catch (error) {
      logger.error(
        'Error fetching authorization endpoint',
        'IdentityModule',
        getErrorForLog(error)
      );

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
        error: getErrorMessage(error),
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
    const objectError = validateObject(request, 'request');
    if (objectError) {
      return objectError;
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

    const redirectUriUrlError = validateUrl(request.redirectUri, 'redirectUri');
    if (redirectUriUrlError) {
      return redirectUriUrlError;
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
   * @param request - Authorization request parameters.
   *
   * @returns Promise that resolves to {@link AuthorizeResponse}.
   *
   * @see {@link Environment}, {@link ResponseMode}
   *
   * @example
   * Using redirect response mode
   * ```typescript
   * try {
   *   const request = {
   *     clientId: "your-client-id",
   *     scope: "profile openid",
   *     redirectUri: "https://your-redirect-uri.com",
   *     environment: "production",
   *     responseMode: "redirect"
   *   };
   *
   *   const { result, error, status_code } = await identityModule.authorize(request);
   *   if (status_code === 200 && result) {
   *     console.log("Auth Code:", result.code);
   *     console.log("State:", result.state);
   *   } else if (status_code === 302) {
   *     console.log("Authorization redirect initiated");
   *   } else if (status_code === 204) {
   *     console.log("User cancelled");
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Using in_place response mode
   * ```typescript
   * try {
   *   const inPlaceRequest = {
   *     clientId: "your-client-id",
   *     scope: "profile openid",
   *     redirectUri: "https://your-redirect-uri.com",
   *     environment: "production",
   *     responseMode: "in_place"
   *   };
   *
   *   const response = await identityModule.authorize(inPlaceRequest);
   *   if (response.status_code === 200 && response.result) {
   *     const { redirectUri } = await identityModule.getAuthorizationArtifacts();
   *     console.log("Actual redirect URI:", redirectUri);
   *   }
   * } catch (error) {
   *   console.error(error);
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
        logger.error(
          `Native authorization returned ${nativeResult.status_code}, falling back to web flow: ${nativeResult.error}`,
          'IdentityModule'
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
      logger.error(
        'Native authorization failed, falling back to web flow',
        'IdentityModule',
        getErrorForLog(error)
      );
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
   * @returns Promise that resolves to {@link GetAuthorizationArtifactsResponse} with stored artifacts.
   *
   * @example
   * ```typescript
   * try {
   *   const { result, status_code, error } = await identityModule.getAuthorizationArtifacts();
   *
   *   if (status_code === 200 && result) {
   *     const { state, codeVerifier, nonce, redirectUri } = result;
   *     console.log("State:", state);
   *     console.log("Code Verifier:", codeVerifier);
   *     console.log("Nonce:", nonce);
   *     console.log("Redirect URI:", redirectUri);
   *
   *     await exchangeToken({
   *       code: authCode,
   *       codeVerifier,
   *       redirectUri,
   *     });
   *   } else if (status_code === 204) {
   *     console.log("No authorization artifacts found.");
   *   } else if (status_code === 400) {
   *     console.error("Authorization artifacts error:", error);
   *   }
   * } catch (error) {
   *   console.error(error);
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
        error: undefined,
      });
    }

    if (existingCount === 0) {
      return Promise.resolve({
        status_code: 204,
        result: undefined,
        error: undefined,
      });
    }

    return Promise.resolve({
      status_code: 400,
      result: undefined,
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
   * @returns Promise that resolves to {@link ClearAuthorizationArtifactsResponse} with status code 204.
   *
   * @example
   * ```typescript
   * try {
   *   const { status_code } = await identityModule.clearAuthorizationArtifacts();
   *   if (status_code === 204) {
   *     console.log("Authorization artifacts cleared successfully");
   *   }
   * } catch (error) {
   *   console.error(error);
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
      result: undefined,
      error: undefined,
    });
  }
}

export default IdentityModule;
