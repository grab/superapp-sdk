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

/**
 * Valibot schema for {@link HasAccessToRequest}.
 *
 * @group Modules
 * @category Scope
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
 * @group Modules
 * @category Scope
 *
 * @public
 */
export const HasAccessToResultSchema = v.boolean();

/**
 * Valibot schema for {@link HasAccessToResponse}.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export const HasAccessToResponseSchema = v.union([
  sdkOkResponseSchema(HasAccessToResultSchema),
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ReloadScopesResponse}.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export const ReloadScopesResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
