/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link TriggerCheckoutRequest}.
 *
 * @remarks
 * The checkout parameters vary depending on the specific payment flow and partner requirements.
 *
 * @public
 */
export const TriggerCheckoutRequestSchema = v.record(v.string(), v.unknown());

/**
 * Valibot schema for {@link TriggerCheckoutResult}.
 *
 * @public
 */
export const TriggerCheckoutResultSchema = v.object({
  transactionID: v.string(),
  status: v.picklist(['success', 'failure', 'pending', 'userInitiatedCancel']),
  errorMessage: v.optional(v.string()),
  errorCode: v.optional(v.string()),
});

/**
 * Valibot schema for {@link TriggerCheckoutResponse}.
 *
 * @public
 */
export const TriggerCheckoutResponseSchema = v.union([
  bridgeSuccessSchema(TriggerCheckoutResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
