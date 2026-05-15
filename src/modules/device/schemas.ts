/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkOkResponseSchema } from '../../core';

/**
 * Valibot schema for {@link IsEsimSupportedResult}.
 *
 * @group Modules
 * @category Device
 *
 * @public
 */
export const IsEsimSupportedResultSchema = v.boolean();

/**
 * Valibot schema for {@link IsEsimSupportedResponse}.
 *
 * @group Modules
 * @category Device
 *
 * @public
 */
export const IsEsimSupportedResponseSchema = v.union([
  sdkOkResponseSchema(IsEsimSupportedResultSchema),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
