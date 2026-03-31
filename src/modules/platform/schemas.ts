/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema } from '../../core';

/**
 * Valibot schema for {@link BackResponse}.
 *
 * @public
 */
export const BackResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
