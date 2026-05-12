/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  AuthorizeRequestSchema,
  AuthorizeResponseSchema,
  AuthorizeResultSchema,
  ClearAuthorizationArtifactsRequestSchema,
  ClearAuthorizationArtifactsResponseSchema,
  GetAuthorizationArtifactsRequestSchema,
  GetAuthorizationArtifactsResponseSchema,
  GetAuthorizationArtifactsResultSchema,
  PkceStorageSchema,
  RawAuthorizeResponseSchema,
} from './schemas';

/**
 * Where PKCE authorization artifacts are persisted between authorize and token exchange.
 *
 * @remarks
 * - `web_session_storage` (default): `window.sessionStorage` under the `grabid:` key prefix.
 * - `grab_storage`: native app storage via {@link StorageModule} (`setString` / `getString` / `remove`).
 *   Requires the `mobile.storage` OAuth scope. There is no automatic fallback if native storage fails.
 *
 * @public
 */
export type PkceStorage = InferOutput<typeof PkceStorageSchema>;

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
 *   responseMode: 'in_place',
 *   pkceStorage: 'grab_storage'
 * }
 * ```
 *
 * @public
 */
export type AuthorizeRequest = InferOutput<typeof AuthorizeRequestSchema>;

/**
 * Optional parameters for {@link IdentityModule.getAuthorizationArtifacts}.
 *
 * @remarks
 * Pass the same `pkceStorage` value you used for {@link IdentityModule.authorize}.
 *
 * @public
 */
export type GetAuthorizationArtifactsRequest = InferOutput<
  typeof GetAuthorizationArtifactsRequestSchema
>;

/**
 * Optional parameters for {@link IdentityModule.clearAuthorizationArtifacts}.
 *
 * @remarks
 * Pass the same `pkceStorage` value you used for {@link IdentityModule.authorize}.
 *
 * @public
 */
export type ClearAuthorizationArtifactsRequest = InferOutput<
  typeof ClearAuthorizationArtifactsRequestSchema
>;

/**
 * Internal type for the raw bridge response from `authorize` before enrichment.
 *
 * @internal
 */
export type RawAuthorizeResponse = InferOutput<typeof RawAuthorizeResponseSchema>;

/**
 * Discriminated failure from PKCE storage helpers (session or native).
 *
 * @internal
 */
export type PkceStorageFailure = {
  ok: false;
  status_code: 400 | 424 | 500 | 501;
  error: string;
};

/**
 * Result of a PKCE storage write or remove.
 *
 * @internal
 */
export type PkceWriteResult = { ok: true } | PkceStorageFailure;

/**
 * Result of a PKCE storage read.
 *
 * @internal
 */
export type PkceReadResult = { ok: true; value: string | null } | PkceStorageFailure;

/**
 * Result object for the authorization flow.
 * Contains the authorization code, state, and PKCE artifacts when native in_place flow completes successfully.
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
export type AuthorizeResult = InferOutput<typeof AuthorizeResultSchema>;

/**
 * Response when initiating an authorization flow.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Authorization completed successfully (native in_place flow). The `result` contains the authorization code, state, and PKCE artifacts (`codeVerifier`, `nonce`, `redirectUri`).
 * - `204`: No content - user cancelled or flow completed without result data.
 * - `302`: Redirect in progress (web redirect flow). The page will navigate away.
 * - `400`: Bad request - missing required OAuth parameters or invalid configuration.
 * - `403`: Forbidden - client not authorized for the requested scope.
 * - `424`: Failed dependency - PKCE artifact storage failed (e.g. native storage or session storage unavailable).
 * - `500`: Internal server error - unexpected error during native authorization.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type AuthorizeResponse = InferOutput<typeof AuthorizeResponseSchema>;

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
 * @public
 */
export type GetAuthorizationArtifactsResult = InferOutput<
  typeof GetAuthorizationArtifactsResultSchema
>;

/**
 * Response when retrieving stored authorization artifacts.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: All artifacts present. The `result` contains the PKCE artifacts needed for token exchange.
 * - `204`: No artifacts yet - authorization has not been initiated.
 * - `400`: Inconsistent state - possible data corruption in storage, or invalid request parameters.
 * - `424`: Failed dependency - native storage read failed.
 * - `500`: Internal server error on the native side.
 * - `501`: Not implemented - native storage requires the Grab app environment.
 *
 * @public
 */
export type GetAuthorizationArtifactsResponse = InferOutput<
  typeof GetAuthorizationArtifactsResponseSchema
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
 * Error status codes mirror storage failures when using `grab_storage`.
 *
 * @public
 */
export type ClearAuthorizationArtifactsResponse = InferOutput<
  typeof ClearAuthorizationArtifactsResponseSchema
>;
