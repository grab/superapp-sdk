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
});

/**
 * Valibot schema for the native bridge `authorize` success payload (before the SDK merges PKCE fields).
 *
 * @internal
 */
export const NativeAuthorizeResultSchema = v.object({
  code: v.string(),
  state: v.string(),
});

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
 * Valibot schema for the raw native `authorize` bridge response before PKCE fields are merged into `result`.
 *
 * @internal
 */
export const RawNativeAuthorizeResponseSchema = v.union([
  bridgeOkSchema(NativeAuthorizeResultSchema),
  bridgeNoContentSchema,
  bridgeRedirectSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

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
]);

/**
 * Valibot schema for {@link ClearAuthorizationArtifactsResponse}.
 *
 * @public
 */
export const ClearAuthorizationArtifactsResponseSchema = v.union([bridgeNoContentSchema]);
