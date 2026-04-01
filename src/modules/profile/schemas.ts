/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeOkSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link FetchEmailResult}.
 *
 * @public
 */
export const FetchEmailResultSchema = v.object({ email: v.string() });

/**
 * Valibot schema for {@link FetchEmailResponse}.
 *
 * @public
 */
export const FetchEmailResponseSchema = v.union([
  bridgeSuccessSchema(FetchEmailResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(426),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link VerifyEmailRequest}.
 *
 * @public
 */
export const VerifyEmailRequestSchema = v.object({
  email: v.pipe(v.string(), v.minLength(1)),
  otp: v.pipe(v.string(), v.minLength(1)),
});

/**
 * Valibot schema for {@link VerifyEmailResponse}.
 *
 * @public
 */
export const VerifyEmailResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(426),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
