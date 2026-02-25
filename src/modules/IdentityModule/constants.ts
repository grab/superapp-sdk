/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { OpenIDConfigEndpoints, VersionInfo } from './type';

/**
 * Storage namespace for IdentityModule
 */
export const NAMESPACE = 'grabid';

/**
 * PKCE code challenge method (SHA-256)
 */
export const CODE_CHALLENGE_METHOD = 'S256';

/**
 * Length of the nonce for PKCE flow
 */
export const NONCE_LENGTH = 16;

/**
 * Length of the state parameter for CSRF protection
 */
export const STATE_LENGTH = 7;

/**
 * Length of the code verifier for PKCE flow
 */
export const CODE_VERIFIER_LENGTH = 64;

/**
 * OpenID configuration endpoints for different environments
 */
export const OPENID_CONFIG_ENDPOINTS: OpenIDConfigEndpoints = {
  staging:
    'https://partner-api.stg-myteksi.com/grabid/v1/oauth2/.well-known/openid-configuration',
  production: 'https://partner-api.grab.com/grabid/v1/oauth2/.well-known/openid-configuration',
};

/**
 * Minimum version required for native consent flow
 */
export const MINIMUM_NATIVE_CONSENT_VERSION: VersionInfo = {
  major: 5,
  minor: 396,
  patch: 0,
};
