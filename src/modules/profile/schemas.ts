/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

/**
 * Valibot schema for {@link FetchEmailResult}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const FetchEmailResultSchema = v.object({ email: v.string() });

/**
 * Valibot schema for {@link FetchEmailResponse}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const FetchEmailResponseSchema = v.union([
  bridgeOkSchema(FetchEmailResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(426),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link VerifyEmailRequest}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const VerifyEmailRequestSchema = v.object({
  email: v.optional(v.pipe(v.string(), v.minLength(1))),
  skipUserInput: v.optional(v.boolean()),
});

/**
 * Valibot schema for {@link VerifyEmailResult}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const VerifyEmailResultSchema = v.object({ email: v.string() });

/**
 * Valibot schema for {@link VerifyEmailResponse}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const VerifyEmailResponseSchema = v.union([
  bridgeOkSchema(VerifyEmailResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(426),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
