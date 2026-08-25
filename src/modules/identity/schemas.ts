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
} from '../../core';
import type {
  AuthorizeRequest,
  AuthorizeResponse,
  AuthorizeResult,
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
  scope: v.pipe(v.string(), v.minLength(1)),
  clientId: v.optional(v.any()),
  redirectUri: v.optional(v.any()),
  environment: v.optional(v.any()),
  responseMode: v.optional(v.any()),
});

const RawAuthorizeResultSchema = v.object({
  code: v.string(),
  state: v.string(),
  codeVerifier: v.string(),
  nonce: v.string(),
  redirectUri: v.string(),
});

/**
 * Internal valibot schema for the raw `JSBridge` response from `authorize` before enrichment.
 *
 * @internal
 */
export const RawAuthorizeResponseSchema: v.GenericSchema<RawAuthorizeResponse> = v.variant(
  'status_code',
  [
    sdkOkResponseSchema(RawAuthorizeResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(403),
    sdkErrorResponseSchema(426),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

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
export const AuthorizeResponseSchema: v.GenericSchema<AuthorizeResponse> = v.variant(
  'status_code',
  [
    sdkOkResponseSchema(AuthorizeResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(403),
    sdkErrorResponseSchema(426),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);
