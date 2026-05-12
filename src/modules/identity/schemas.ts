/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  bridgeErrorSchema,
  bridgeNoContentSchema,
  bridgeOkSchema,
  bridgeRedirectSchema,
} from '../../core';

/**
 * Optional PKCE artifact storage backend for identity flows.
 *
 * @public
 */
export const PkceStorageSchema = v.picklist(['web_session_storage', 'grab_storage']);

/**
 * Request body shared by {@link GetAuthorizationArtifactsRequest} and {@link ClearAuthorizationArtifactsRequest}.
 *
 * @public
 */
export const AuthorizationArtifactsStorageRequestSchema = v.object({
  pkceStorage: v.optional(PkceStorageSchema),
});

/**
 * Valibot schema for {@link GetAuthorizationArtifactsRequest}.
 *
 * @public
 */
export const GetAuthorizationArtifactsRequestSchema = AuthorizationArtifactsStorageRequestSchema;

/**
 * Valibot schema for {@link ClearAuthorizationArtifactsRequest}.
 *
 * @public
 */
export const ClearAuthorizationArtifactsRequestSchema = AuthorizationArtifactsStorageRequestSchema;

/**
 * Valibot schema for {@link AuthorizeRequest}.
 *
 * @public
 */
export const AuthorizeRequestSchema = v.object({
  clientId: v.pipe(v.string(), v.minLength(1)),
  redirectUri: v.pipe(v.string(), v.url()),
  scope: v.pipe(v.string(), v.minLength(1)),
  environment: v.picklist(['staging', 'production']),
  responseMode: v.optional(v.picklist(['redirect', 'in_place'])),
  pkceStorage: v.optional(PkceStorageSchema),
});

const RawAuthorizeResultSchema = v.object({
  code: v.string(),
  state: v.string(),
});

/**
 * Internal valibot schema for the raw bridge response from `authorize` before enrichment.
 *
 * @internal
 */
export const RawAuthorizeResponseSchema = v.union([
  bridgeOkSchema(RawAuthorizeResultSchema),
  bridgeNoContentSchema,
  bridgeRedirectSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link AuthorizeResult}.
 *
 * @public
 */
export const AuthorizeResultSchema = v.object({
  code: v.string(),
  state: v.string(),
  codeVerifier: v.string(),
  nonce: v.string(),
  redirectUri: v.string(),
});

/**
 * Valibot schema for {@link AuthorizeResponse}.
 *
 * @public
 */
export const AuthorizeResponseSchema = v.union([
  bridgeOkSchema(AuthorizeResultSchema),
  bridgeNoContentSchema,
  bridgeRedirectSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link GetAuthorizationArtifactsResult}.
 *
 * @public
 */
export const GetAuthorizationArtifactsResultSchema = v.object({
  state: v.string(),
  codeVerifier: v.string(),
  nonce: v.string(),
  redirectUri: v.string(),
});

/**
 * Valibot schema for {@link GetAuthorizationArtifactsResponse}.
 *
 * @public
 */
export const GetAuthorizationArtifactsResponseSchema = v.union([
  bridgeOkSchema(GetAuthorizationArtifactsResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link ClearAuthorizationArtifactsResponse}.
 *
 * @public
 */
export const ClearAuthorizationArtifactsResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
