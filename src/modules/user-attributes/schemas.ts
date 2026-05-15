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
 * Valibot schema for {@link GetSelectedTravelDestinationResult}.
 *
 * @group Modules
 * @category User Attributes
 *
 * @public
 */
export const GetSelectedTravelDestinationResultSchema = v.string();

/**
 * Valibot schema for {@link GetSelectedTravelDestinationResponse}.
 *
 * @group Modules
 * @category User Attributes
 *
 * @public
 */
export const GetSelectedTravelDestinationResponseSchema = v.union([
  sdkOkResponseSchema(GetSelectedTravelDestinationResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
