/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  sdkErrorResponseSchema,
  sdkNoContentResponseSchema,
  sdkOkResponseSchema,
  sdkRedirectResponseSchema,
} from '../../core';
import type {
  AuthorizeRequest,
  AuthorizeResponse,
  AuthorizeResult,
  ClearAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsResponse,
  GetAuthorizationArtifactsResult,
  RawAuthorizeResponse,
} from './types';

/**
 * Valibot schema for {@link AuthorizeRequest}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export const AuthorizeRequestSchema: v.GenericSchema<AuthorizeRequest> = v.object({
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
 * Internal valibot schema for the raw `JSBridge` response from `authorize` before enrichment.
 *
 * @internal
 */
export const RawAuthorizeResponseSchema: v.GenericSchema<RawAuthorizeResponse> = v.union([
  sdkOkResponseSchema(RawAuthorizeResultSchema),
  sdkNoContentResponseSchema,
  sdkRedirectResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link AuthorizeResult}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export const AuthorizeResultSchema: v.GenericSchema<AuthorizeResult> = v.object({
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
export const AuthorizeResponseSchema: v.GenericSchema<AuthorizeResponse> = v.union([
  sdkOkResponseSchema(AuthorizeResultSchema),
  sdkNoContentResponseSchema,
  sdkRedirectResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetAuthorizationArtifactsResult}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export const GetAuthorizationArtifactsResultSchema: v.GenericSchema<GetAuthorizationArtifactsResult> =
  v.object({
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
export const GetAuthorizationArtifactsResponseSchema: v.GenericSchema<GetAuthorizationArtifactsResponse> =
  v.union([
    sdkOkResponseSchema(GetAuthorizationArtifactsResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
  ]);

/**
 * Valibot schema for {@link ClearAuthorizationArtifactsResponse}.
 *
 * @group Modules
 * @category Identity
 *
 * @public
 */
export const ClearAuthorizationArtifactsResponseSchema: v.GenericSchema<ClearAuthorizationArtifactsResponse> =
  v.union([sdkNoContentResponseSchema]);
