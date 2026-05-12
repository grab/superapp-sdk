/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Namespace for session storage keys, native storage keys, and JSBridge communication.
 *
 * @internal
 */
export const NAMESPACE = 'grabid';

/**
 * PKCE code challenge method - always S256 (SHA256).
 *
 * @internal
 */
export const CODE_CHALLENGE_METHOD = 'S256';

/**
 * Length of the nonce for OAuth2 authorization.
 *
 * @internal
 */
export const NONCE_LENGTH = 16;

/**
 * Length of the state parameter for OAuth2 authorization.
 *
 * @internal
 */
export const STATE_LENGTH = 32;

/**
 * Length of the PKCE code verifier.
 *
 * @internal
 */
export const CODE_VERIFIER_LENGTH = 64;

/**
 * OpenID configuration endpoints for different environments.
 *
 * @internal
 */
export const OPENID_CONFIG_ENDPOINTS = {
  staging: 'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
  production: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
};

/**
 * Storage keys used by IdentityModule under the `NAMESPACE` prefix.
 *
 * @internal
 */
export const STORAGE_KEYS = {
  nonce: 'nonce',
  state: 'state',
  codeVerifier: 'code_verifier',
  redirectUri: 'redirect_uri',
  loginReturnUri: 'login_return_uri',
} as const;

/**
 * Union of allowed storage key strings (IdentityModule session / native storage).
 *
 * @internal
 */
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
