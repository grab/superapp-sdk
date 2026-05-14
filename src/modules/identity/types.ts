/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type {
  SDKErrorResponse,
  SDKNoContentResponse,
  SDKOkResponse,
  SDKRedirectResponse,
} from '../../core';

/**
 * Request parameters for initiating an OAuth2 authorization flow with PKCE.
 *
 * @group Modules
 * @category Identity
 *
 * @example
 * **Production environment with redirect mode:**
 * ```typescript
 * {
 *   clientId: 'your-client-id',
 *   redirectUri: 'https://your-app.com/callback',
 *   scope: 'openid profile',
 *   environment: 'production',
 *   responseMode: 'redirect'
 * }
 * ```
 *
 * @example
 * **Staging environment with in_place mode:**
 * ```typescript
 * {
 *   clientId: 'staging-client-id',
 *   redirectUri: 'https://staging-app.com/callback',
 *   scope: 'openid',
 *   environment: 'staging',
 *   responseMode: 'in_place'
 * }
 * ```
 *
 * @public
 */
export interface AuthorizeRequest {
  /** OAuth2 client identifier registered for your MiniApp. */
  clientId: string;
  /** Registered redirect URI for the OAuth client (used for redirect-based flows). */
  redirectUri: string;
  /** Space-delimited OAuth scopes (for example `openid profile`). */
  scope: string;
  /** GrabID environment for the authorization server. */
  environment: 'staging' | 'production';
  /**
   * How the native layer completes authorization.
   *
   * @defaultValue `'redirect'`
   */
  responseMode?: 'redirect' | 'in_place';
}

/**
 * Native OAuth result before PKCE enrichment (partial result).
 *
 * @internal
 */
export interface NativeAuthorizeResult {
  code: string;
  state: string;
}

/**
 * Internal type for the native response from `authorize` before enrichment.
 *
 * @internal
 */
export type NativeAuthorizeResponse =
  | SDKOkResponse<NativeAuthorizeResult>
  | SDKNoContentResponse
  | SDKRedirectResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for the authorization flow.
 * Contains the authorization code, state, and PKCE artifacts when native in_place flow completes successfully.
 *
 * @group Modules
 * @category Identity
 *
 * @example
 * ```typescript
 * {
 *   code: 'auth-code-abc123',
 *   state: 'csrf-state-xyz789',
 *   codeVerifier: 'code-verifier-123',
 *   nonce: 'nonce-abc',
 *   redirectUri: 'https://your-app.com/current-page'
 * }
 * ```
 *
 * @public
 */
export interface AuthorizeResult {
  code: string;
  state: string;
  codeVerifier: string;
  nonce: string;
  redirectUri: string;
}

/**
 * Response returned by {@link IdentityModule.authorize}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export type AuthorizeResponse =
  | SDKOkResponse<AuthorizeResult>
  | SDKNoContentResponse
  | SDKRedirectResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object containing the stored PKCE authorization artifacts.
 * These are used to complete the OAuth2 authorization code exchange.
 *
 * @group Modules
 * @category Identity
 *
 * @example
 * **All artifacts present:**
 * ```typescript
 * {
 *   state: 'csrf-state-xyz789',
 *   codeVerifier: 'code-verifier-123',
 *   nonce: 'nonce-abc',
 *   redirectUri: 'https://your-app.com/callback'
 * }
 * ```
 *
 * @public
 */
export interface GetAuthorizationArtifactsResult {
  state: string;
  codeVerifier: string;
  nonce: string;
  redirectUri: string;
}

/**
 * Response returned by {@link IdentityModule.getAuthorizationArtifacts}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export type GetAuthorizationArtifactsResponse =
  | SDKOkResponse<GetAuthorizationArtifactsResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>;

/**
 * Result object for clearing authorization artifacts.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export type ClearAuthorizationArtifactsResult = void;

/**
 * Response returned by {@link IdentityModule.clearAuthorizationArtifacts}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export type ClearAuthorizationArtifactsResponse = SDKNoContentResponse;
