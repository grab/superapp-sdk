/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkOkResponseSchema } from '../../core';
import type { IsEsimSupportedResponse, IsEsimSupportedResult } from './types';

/**
 * Valibot schema for {@link IsEsimSupportedResult}.
 *
 * @group Modules
 * @category Device
 *
 * @public
 */
export const IsEsimSupportedResultSchema: v.GenericSchema<IsEsimSupportedResult> = v.boolean();

/**
 * Valibot schema for {@link IsEsimSupportedResponse}.
 *
 * @group Modules
 * @category Device
 *
 * @public
 */
export const IsEsimSupportedResponseSchema: v.GenericSchema<IsEsimSupportedResponse> = v.union([
  sdkOkResponseSchema(IsEsimSupportedResultSchema),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
