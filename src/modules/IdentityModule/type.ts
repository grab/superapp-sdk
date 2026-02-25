/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

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
 * Response type for getting authorization artifacts
 */
export type GetAuthorizationArtifactsResponse =
  | {
      status_code: 200;
      result: AuthorizationArtifactsResult;
      error: null;
    }
  | {
      status_code: 204;
      result: null;
      error: null;
    }
  | {
      status_code: 400;
      result: null;
      error: string;
    };

/**
 * Response type for clearing authorization artifacts
 */
export type ClearAuthorizationArtifactsResponse = {
  status_code: 204;
  result: null;
  error: null;
};

/**
 * Grab user agent information parsed from user agent string
 */
export type GrabUserAgentInfo = {
  /**
   * App name (e.g., "Grab", "GrabBeta")
   */
  appName: string;
  /**
   * Major version number
   */
  major: number;
  /**
   * Minor version number
   */
  minor: number;
  /**
   * Patch version number
   */
  patch: number;
  /**
   * Platform (Android or iOS)
   */
  platform: string;
} | null;

/**
 * Version information for comparison
 */
export type VersionInfo = {
  major: number;
  minor: number;
  patch: number;
};

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
  state: string;
  codeVerifier: string;
  nonce: string;
  redirectUri: string;
};

/**
 * Authorization response
 */
export type AuthorizeResponse = WrappedResponse<AuthorizeResult>;

/**
 * Should use web consent request
 */
export type ShouldUseWebConsentRequest = {
  environment: Environment;
};
