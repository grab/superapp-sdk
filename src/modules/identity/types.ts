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
 * @public
 */
export type AuthorizeRequest = {
  /** OAuth client identifier issued to your application. */
  clientId: string;
  /** OAuth redirect URI registered for your application. */
  redirectUri: string;
  /** OAuth scopes requested for the authorization flow (for example, `"openid profile.read phone mobile.storage"`). */
  scope: string;
  /** Target authorization environment (for example, `"staging"` or `"production"`). */
  environment: 'staging' | 'production';
  /** Authorization response mode for result delivery (for example, `"redirect"` or `"in_place"`). */
  responseMode?: 'redirect' | 'in_place';
};

/**
 * Internal type for the raw `JSBridge` response from `authorize` before enrichment.
 *
 * @internal
 */
export type RawAuthorizeResponse =
  | SDKOkResponse<{
      code: string;
      state: string;
    }>
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
 * @public
 */
export type AuthorizeResult = {
  /** Authorization code returned by the OAuth flow. */
  code: string;
  /** State value used to correlate and validate the flow. */
  state: string;
  /** PKCE code verifier used for token exchange. */
  codeVerifier: string;
  /** Nonce value used to bind and validate the authorization response. */
  nonce: string;
  /** OAuth redirect URI registered for your application. */
  redirectUri: string;
};

/**
 * Response when initiating an authorization flow.
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
 * @public
 */
export type GetAuthorizationArtifactsResult = {
  /** State value used to correlate and validate the flow. */
  state: string;
  /** PKCE code verifier used for token exchange. */
  codeVerifier: string;
  /** Nonce value used to bind and validate the authorization response. */
  nonce: string;
  /** OAuth redirect URI registered for your application. */
  redirectUri: string;
};

/**
 * Response when retrieving stored authorization artifacts.
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
 * Response when clearing stored authorization artifacts.
 *
 * @group Modules
 * @category Identity
 *
 *
 * @public
 */
export type ClearAuthorizationArtifactsResponse = SDKNoContentResponse;
