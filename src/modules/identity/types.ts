/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResponse, NoResultResponse, SuccessResponse } from '../../core';

/**
 * Environment type for GrabID endpoints
 */
export type Environment = 'staging' | 'production';

/**
 * Response mode for authorization flow
 */
export type ResponseMode = 'redirect' | 'in_place';

/**
 * OpenID configuration endpoints for different environments
 */
export type OpenIDConfigEndpoints = {
  staging: string;
  production: string;
};

/**
 * PKCE (Proof Key for Code Exchange) artifacts for OAuth 2.0 flow
 */
export type PKCEArtifacts = {
  /**
   * Random nonce for security
   */
  nonce: string;
  /**
   * State parameter for CSRF protection
   */
  state: string;
  /**
   * Code verifier for PKCE flow
   */
  codeVerifier: string;
  /**
   * Code challenge derived from code verifier
   */
  codeChallenge: string;
  /**
   * Method used to generate code challenge (typically S256)
   */
  codeChallengeMethod: string;
};

/**
 * Stored PKCE artifacts with redirect URI
 */
export type StoredPKCEArtifacts = {
  nonce: string;
  state: string;
  codeVerifier: string;
  redirectUri: string;
};

/**
 * Authorization artifacts result
 */
export type AuthorizationArtifactsResult = {
  state: string | null;
  codeVerifier: string | null;
  nonce: string | null;
  redirectUri: string | null;
};

/**
 * Success response when authorization artifacts are retrieved
 */
export type GetAuthorizationArtifactsSuccessResponse =
  SuccessResponse<AuthorizationArtifactsResult>;

/**
 * No result response when no authorization artifacts are stored
 */
export type GetAuthorizationArtifactsNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - No authorization artifacts found
   */
  status_code: 204;
};

/**
 * Error response when authorization artifacts retrieval fails
 */
export type GetAuthorizationArtifactsErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Inconsistent authorization artifacts in storage
   */
  status_code: 400;
};

/**
 * Response type for getting authorization artifacts
 */
export type GetAuthorizationArtifactsResponse =
  | GetAuthorizationArtifactsSuccessResponse
  | GetAuthorizationArtifactsNoResultResponse
  | GetAuthorizationArtifactsErrorResponse;

/**
 * Success response when authorization artifacts are cleared
 */
export type ClearAuthorizationArtifactsSuccessResponse = NoResultResponse & {
  /**
   * Status code: `204` - No Content (successful operation)
   */
  status_code: 204;
};

/**
 * Response type for clearing authorization artifacts
 */
export type ClearAuthorizationArtifactsResponse = ClearAuthorizationArtifactsSuccessResponse;

/**
 * Web authorization parameters
 */
export type WebAuthorizationParams = {
  environment: Environment;
  redirectUri: string;
  clientId: string;
  scope: string;
  nonce: string;
  state: string;
  codeChallengeMethod: string;
  codeChallenge: string;
};

/**
 * Native authorization parameters
 */
export type NativeAuthorizationParams = {
  clientId: string;
  actualRedirectUri: string;
  scope: string;
  nonce: string;
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  responseMode: string;
};

/**
 * Authorization request parameters
 */
export type AuthorizeRequest = {
  /**
   * OAuth 2.0 client ID
   */
  clientId: string;
  /**
   * Space-separated list of OAuth scopes
   */
  scope: string;
  /**
   * Redirect URI for OAuth callback
   */
  redirectUri: string;
  /**
   * Environment to use (staging or production)
   */
  environment: Environment;
  /**
   * Response mode - redirect (default) or in_place
   */
  responseMode?: ResponseMode;
};

/**
 * Authorization result
 */
export type AuthorizeResult = {
  /**
   * Authorization code
   */
  code: string;
  /**
   * State parameter for CSRF protection
   */
  state: string;
};

/**
 * Success response when authorization is successful (in_place mode with native flow)
 */
export type AuthorizeSuccessResponse = SuccessResponse<AuthorizeResult>;

/**
 * Redirect response when authorization redirect is initiated
 */
export type AuthorizeRedirectResponse = NoResultResponse & {
  /**
   * Status code: `302` - Authorization redirect initiated (web flow or redirect response mode)
   */
  status_code: 302;
};

/**
 * Cancelled response when user cancels authorization
 */
export type AuthorizeCancelledResponse = NoResultResponse & {
  /**
   * Status code: `204` - User cancelled the authorization
   */
  status_code: 204;
};

/**
 * Error response when authorization fails
 */
export type AuthorizeErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request or configuration error
   * - `401`: Authentication failed
   * - `403`: Forbidden (permission denied)
   */
  status_code: 400 | 401 | 403;
};

/**
 * Authorization response
 */
export type AuthorizeResponse =
  | AuthorizeSuccessResponse
  | AuthorizeRedirectResponse
  | AuthorizeCancelledResponse
  | AuthorizeErrorResponse;

/**
 * Should use web consent request
 */
export type ShouldUseWebConsentRequest = {
  environment: Environment;
};

/**
 * Concrete interface for the native Identity module bridge.
 */
export interface WrappedIdentityModule {
  invoke(
    method: 'authorize',
    params: {
      clientId: string;
      redirectUri: string;
      scope: string;
      nonce: string;
      state: string;
      codeChallenge: string;
      codeChallengeMethod: string;
      responseMode: string;
    }
  ): Promise<AuthorizeResponse>;
}

declare global {
  interface Window {
    WrappedIdentityModule: WrappedIdentityModule;
  }
}
