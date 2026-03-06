/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response/types';

/**
 * Request parameters for initiating an OAuth2 authorization flow with PKCE.
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
   * @defaultValue 'redirect'
   */
  responseMode?: 'redirect' | 'in_place';
};

/**
 * Result object for the authorization flow.
 * Contains the authorization code and state when native in_place flow completes successfully.
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
 * @public
 */
export type AuthorizeResponse = ConstrainedBridgeResponse<AuthorizeResult, 200 | 302 | 204 | 400>;

/**
 * Result object containing the stored PKCE authorization artifacts.
 * These are used to complete the OAuth2 authorization code exchange.
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
 * @public
 */
export type ClearAuthorizationArtifactsResponse = ConstrainedBridgeResponse<
  ClearAuthorizationArtifactsResult,
  204
>;
