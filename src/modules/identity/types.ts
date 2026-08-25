/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for initiating an OAuth2 authorization flow with PKCE.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export type AuthorizeRequest = {
  /** OAuth scopes requested for the authorization flow (for example, `"openid profile.read phone mobile.storage"`). */
  scope: string;
  /** @deprecated Ignored. No longer required for authorization. */
  clientId?: string;
  /** @deprecated Ignored. No longer required for authorization. */
  redirectUri?: string;
  /** @deprecated Ignored. No longer required for authorization. */
  environment?: 'staging' | 'production';
  /** @deprecated Ignored. The response mode is always `in_place` via the native bridge. */
  responseMode?: 'redirect' | 'in_place';
};

/**
 * Internal type for the raw `JSBridge` response from `authorize` before enrichment.
 *
 * @internal
 */
export type RawAuthorizeResponse =
  | SDKOkResponse<AuthorizeResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<426>
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
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
