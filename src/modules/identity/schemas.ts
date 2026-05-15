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
 * @group Modules
 * @category Identity
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
 * @group Modules
 * @category Identity
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
 * @group Modules
 * @category Identity
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
 * @group Modules
 * @category Identity
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
 * @group Modules
 * @category Identity
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
 * @group Modules
 * @category Identity
 *
 * @public
 */
export const ClearAuthorizationArtifactsResponseSchema = v.union([bridgeNoContentSchema]);
