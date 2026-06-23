/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkOkResponseSchema } from '../../core';
import type {
  TriggerCheckoutRequest,
  TriggerCheckoutResponse,
  TriggerCheckoutResult,
} from './types';

/**
 * Valibot schema for {@link TriggerCheckoutRequest}.
 *
 * @group Modules
 * @category Checkout
 *
 * @remarks
 * The checkout parameters vary depending on the specific payment flow and partner requirements.
 *
 * @public
 */
export const TriggerCheckoutRequestSchema: v.GenericSchema<TriggerCheckoutRequest> = v.record(
  v.string(),
  v.unknown()
);

/**
 * Valibot schema for {@link TriggerCheckoutResult}.
 *
 * @group Modules
 * @category Checkout
 *
 * @public
 */
export const TriggerCheckoutResultSchema: v.GenericSchema<TriggerCheckoutResult> = v.variant(
  'status',
  [
    v.object({
      status: v.literal('Success'),
      transactionID: v.string(),
    }),
    v.object({
      status: v.literal('Failure'),
      transactionID: v.string(),
      errorMessage: v.string(),
      errorCode: v.string(),
    }),
    v.object({
      status: v.literal('Pending'),
      transactionID: v.string(),
    }),
    v.object({
      status: v.literal('Cancel'),
    }),
  ]
);

/**
 * Valibot schema for {@link TriggerCheckoutResponse}.
 *
 * @group Modules
 * @category Checkout
 *
 * @public
 */
export const TriggerCheckoutResponseSchema: v.GenericSchema<TriggerCheckoutResponse> = v.union([
  sdkOkResponseSchema(TriggerCheckoutResultSchema),
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
