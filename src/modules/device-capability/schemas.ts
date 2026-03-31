/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link IsEsimSupportedResult}.
 *
 * @public
 */
export const IsEsimSupportedResultSchema = v.boolean();

/**
 * Valibot schema for {@link IsEsimSupportedResponse}.
 *
 * @public
 */
export const IsEsimSupportedResponseSchema = v.union([
  bridgeSuccessSchema(IsEsimSupportedResultSchema),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
