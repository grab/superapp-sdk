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
import type {
  GetSelectedTravelDestinationResponse,
  GetSelectedTravelDestinationResult,
} from './types';

/**
 * Valibot schema for {@link GetSelectedTravelDestinationResult}.
 *
 * @internal
 */
export const GetSelectedTravelDestinationResultSchema: v.GenericSchema<GetSelectedTravelDestinationResult> =
  v.string();

/**
 * Valibot schema for {@link GetSelectedTravelDestinationResponse}.
 *
 * @internal
 */
export const GetSelectedTravelDestinationResponseSchema: v.GenericSchema<GetSelectedTravelDestinationResponse> =
  v.union([
    sdkOkResponseSchema(GetSelectedTravelDestinationResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);
