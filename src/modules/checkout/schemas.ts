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
 * @remarks
 * The checkout parameters vary depending on the specific payment flow and partner requirements.
 *
 * @internal
 */
export const TriggerCheckoutRequestSchema: v.GenericSchema<TriggerCheckoutRequest> = v.record(
  v.string(),
  v.unknown()
);

/**
 * Valibot schema for {@link TriggerCheckoutResult}.
 *
 * @internal
 */
export const TriggerCheckoutResultSchema: v.GenericSchema<TriggerCheckoutResult> = v.variant(
  'status',
  [
    v.object({
      status: v.literal('success'),
      transactionID: v.string(),
    }),
    v.object({
      status: v.literal('failure'),
      transactionID: v.string(),
      errorMessage: v.string(),
      errorCode: v.string(),
    }),
    v.object({
      status: v.literal('pending'),
      transactionID: v.string(),
    }),
    v.object({
      status: v.literal('userInitiatedCancel'),
    }),
  ]
);

/**
 * Valibot schema for {@link TriggerCheckoutResponse}.
 *
 * @internal
 */
export const TriggerCheckoutResponseSchema: v.GenericSchema<TriggerCheckoutResponse> = v.union([
  sdkOkResponseSchema(TriggerCheckoutResultSchema),
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
