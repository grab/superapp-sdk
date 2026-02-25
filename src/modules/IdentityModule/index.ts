/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import type { WrappedResponse } from '../../core/types';
import {
  generateRandomString,
  generateCodeVerifier,
  generateCodeChallenge,
  normalizeUrl,
  buildAuthorizeUrl,
  parseGrabUserAgent,
  isVersionBelow,
  validateRequiredString,
} from '../../utils';
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

export class IdentityModule extends ModuleBase {
  constructor() {
    super('IdentityModule');
  }

  async fetchAuthorizationEndpoint(environment: Environment): Promise<string> {
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

  generatePKCEArtifacts(): PKCEArtifacts {
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

  storePKCEArtifacts(artifacts: StoredPKCEArtifacts): void {
    this.setStorageItem('nonce', artifacts.nonce);
    this.setStorageItem('state', artifacts.state);
    this.setStorageItem('code_verifier', artifacts.codeVerifier);
    this.setStorageItem('redirect_uri', artifacts.redirectUri);
  }

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

  setStorageItem(key: string, value: string) {
    window.localStorage.setItem(`${NAMESPACE}:${key}`, value);
  }

  getStorageItem(key: string) {
    return window.localStorage.getItem(`${NAMESPACE}:${key}`);
  }

  static shouldUseWebConsent(request: ShouldUseWebConsentRequest): boolean {
    const userAgentInfo = parseGrabUserAgent(window.navigator.userAgent);
    if (!userAgentInfo) {
      return true;
    }

    if (request.environment === 'staging') {
      return false;
    }

    return isVersionBelow(userAgentInfo, MINIMUM_NATIVE_CONSENT_VERSION);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async performWebAuthorization(params: WebAuthorizationParams): Promise<WrappedResponse<any>> {
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
    // Status 302 is not part of the standard WrappedResponse union but is used here
    // to indicate a redirect operation
    return Promise.resolve({
      status_code: 302 as 200,
      result: null as unknown as Record<string, unknown>,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static performNativeAuthorization(
    invokeParams: NativeAuthorizationParams
  ): Promise<WrappedResponse<any>> {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async authorize(request: AuthorizeRequest): Promise<WrappedResponse<any>> {
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

  static validateAuthorizeRequest(request: AuthorizeRequest): string | null {
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
}

export type {
  Environment,
  ResponseMode,
  OpenIDConfigEndpoints,
  PKCEArtifacts,
  StoredPKCEArtifacts,
  AuthorizationArtifactsResult,
  GetAuthorizationArtifactsResponse,
  ClearAuthorizationArtifactsResponse,
  GrabUserAgentInfo,
  VersionInfo,
  WebAuthorizationParams,
  NativeAuthorizationParams,
  AuthorizeRequest,
  AuthorizeResponse,
  ShouldUseWebConsentRequest,
} from './type';
