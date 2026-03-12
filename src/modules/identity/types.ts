/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Request parameters for initiating an OAuth2 authorization flow with PKCE.
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
export type AuthorizeRequest = {
  /** The OAuth2 client ID for your MiniApp. */
  clientId: string;
  /** The redirect URI registered for your MiniApp. */
  redirectUri: string;
  /** The OAuth2 scopes to request (space-separated string). */
  scope: string;
  /** The environment to use for authorization ('staging' or 'production'). */
  environment: 'staging' | 'production';
  /**
   * The response mode for the authorization flow.
   * - 'redirect': User is redirected to the redirect URI after authorization
   * - 'in_place': Authorization happens within the current page context
   *
   * @defaultValue 'redirect'
   */
  responseMode?: 'redirect' | 'in_place';
};

/**
 * Result object for the authorization flow.
 * Contains the authorization code and state when native in_place flow completes successfully.
 *
 * @example
 * ```typescript
 * {
 *   code: 'auth-code-abc123',
 *   state: 'csrf-state-xyz789'
 * }
 * ```
 *
 * @public
 */
export type AuthorizeResult = {
  /** The authorization code returned from the server. */
  code: string;
  /** The state parameter returned from the server for CSRF protection. */
  state: string;
};

/**
 * Response when initiating an authorization flow.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Authorization completed successfully (native in_place flow). The `result` contains the authorization code and state.
 * - `302`: Redirect in progress (web redirect flow). The page will navigate away.
 * - `204`: No content - user cancelled or flow completed without result data.
 * - `400`: Bad request - missing required OAuth parameters or invalid configuration.
 *
 * @example
 * **Success response (200) - native in_place flow:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: {
 *     code: 'auth-code-abc123',
 *     state: 'csrf-state-xyz789'
 *   }
 * }
 * ```
 *
 * @example
 * **Redirect response (302) - web flow:**
 * ```typescript
 * { status_code: 302 }
 * ```
 *
 * @example
 * **Cancelled response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required OAuth parameters'
 * }
 * ```
 *
 * @public
 */
export type AuthorizeResponse = ConstrainedBridgeResponse<
  AuthorizeResult,
  200 | 302 | 204 | 400 | 401 | 403
>;

/**
 * Result object containing the stored PKCE authorization artifacts.
 * These are used to complete the OAuth2 authorization code exchange.
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
 * @example
 * **No artifacts (null):**
 * ```typescript
 * null
 * ```
 *
 * @public
 */
export type GetAuthorizationArtifactsResult = {
  /** The state parameter used in the authorization request. */
  state: string;
  /** The code verifier for PKCE. */
  codeVerifier: string;
  /** The nonce used in the authorization request. */
  nonce: string;
  /** The redirect URI used in the authorization request. */
  redirectUri: string;
} | null;

/**
 * Response when retrieving stored authorization artifacts.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: All artifacts present. The `result` contains the PKCE artifacts needed for token exchange.
 * - `204`: No artifacts yet - authorization has not been initiated.
 * - `400`: Inconsistent state - possible data corruption in storage.
 *
 * @example
 * **Success response (200) - all artifacts present:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: {
 *     state: 'csrf-state-xyz789',
 *     codeVerifier: 'code-verifier-123',
 *     nonce: 'nonce-abc',
 *     redirectUri: 'https://your-app.com/callback'
 *   }
 * }
 * ```
 *
 * @example
 * **No content response (204) - no artifacts:**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400) - inconsistent state:**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Inconsistent authorization artifacts in storage'
 * }
 * ```
 *
 * @public
 */
export type GetAuthorizationArtifactsResponse = ConstrainedBridgeResponse<
  GetAuthorizationArtifactsResult,
  200 | 204 | 400
>;

/**
 * Result object for clearing authorization artifacts.
 * This operation returns no data on success.
 *
 * @public
 */
export type ClearAuthorizationArtifactsResult = void;

/**
 * Response when clearing stored authorization artifacts.
 *
 * @remarks
 * This response returns status code `204` when artifacts are successfully cleared.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @public
 */
export type ClearAuthorizationArtifactsResponse = ConstrainedBridgeResponse<
  ClearAuthorizationArtifactsResult,
  204
>;
