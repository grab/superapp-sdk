/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

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
  bridgeOkSchema(GetSelectedTravelDestinationResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
