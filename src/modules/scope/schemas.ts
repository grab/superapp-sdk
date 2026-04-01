/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeOkSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link HasAccessToRequest}.
 *
 * @public
 */
export const HasAccessToRequestSchema = v.object({
  module: v.pipe(v.string(), v.minLength(1)),
  method: v.pipe(v.string(), v.minLength(1)),
});

/**
 * Valibot schema for {@link HasAccessToResult}.
 *
 * @public
 */
export const HasAccessToResultSchema = v.object({ hasAccess: v.boolean() });

/**
 * Valibot schema for {@link HasAccessToResponse}.
 *
 * @public
 */
export const HasAccessToResponseSchema = v.union([
  bridgeSuccessSchema(HasAccessToResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link ReloadScopesResponse}.
 *
 * @public
 */
export const ReloadScopesResponseSchema = v.union([
  bridgeOkSchema,
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
