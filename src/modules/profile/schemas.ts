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
  FetchEmailResponse,
  FetchEmailResult,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailResult,
} from './types';

/**
 * Valibot schema for {@link FetchEmailResult}.
 *
 * @internal
 */
export const FetchEmailResultSchema: v.GenericSchema<FetchEmailResult> = v.object({
  email: v.string(),
});

/**
 * Valibot schema for {@link FetchEmailResponse}.
 *
 * @internal
 */
export const FetchEmailResponseSchema: v.GenericSchema<FetchEmailResponse> = v.union([
  sdkOkResponseSchema(FetchEmailResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link VerifyEmailRequest}.
 *
 * @internal
 */
export const VerifyEmailRequestSchema: v.GenericSchema<VerifyEmailRequest> = v.object({
  email: v.optional(v.pipe(v.string(), v.minLength(1))),
  skipUserInput: v.optional(v.boolean()),
});

/**
 * Valibot schema for {@link VerifyEmailResult}.
 *
 * @internal
 */
export const VerifyEmailResultSchema: v.GenericSchema<VerifyEmailResult> = v.object({
  email: v.string(),
});

/**
 * Valibot schema for {@link VerifyEmailResponse}.
 *
 * @internal
 */
export const VerifyEmailResponseSchema: v.GenericSchema<VerifyEmailResponse> = v.union([
  sdkOkResponseSchema(VerifyEmailResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
