/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { sdkErrorResponseSchema, sdkOkResponseSchema } from '../../core';
import type {
  EstimatedFiat,
  EstimateGrabCoinRequest,
  EstimateGrabCoinResponse,
  EstimateGrabCoinResult,
} from './types';

/**
 * Valibot schema for a single {@link EstimateGrabCoinRequestItem}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateGrabCoinRequestItemSchema = v.object({
  id: v.pipe(v.string(), v.minLength(1)),
  amount_in_minor_units: v.pipe(v.number(), v.integer(), v.minValue(1)),
  currency_code: v.pipe(v.string(), v.minLength(1)),
});

/**
 * Valibot schema for {@link EstimateGrabCoinRequest}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateGrabCoinRequestSchema: v.GenericSchema<EstimateGrabCoinRequest> = v.pipe(
  v.object({
    items: v.pipe(v.array(EstimateGrabCoinRequestItemSchema), v.minLength(1)),
  }),
  v.check(
    ({ items }) => new Set(items.map((item) => item.id)).size === items.length,
    'Duplicate item id detected'
  )
);

const EstimatedFiatSchema: v.GenericSchema<EstimatedFiat> = v.object({
  amount_in_minor_units: v.number(),
  currency_code: v.string(),
});

const EstimateGrabCoinSuccessItemSchema = v.object({
  id: v.string(),
  status_code: v.literal('SUCCESS'),
  result: v.object({
    reward: v.object({
      amount: v.number(),
      currency_code: v.string(),
      display_amount: v.string(),
    }),
    estimated_fiat: v.optional(EstimatedFiatSchema),
  }),
});

const EstimateGrabCoinNotApplicableItemSchema = v.object({
  id: v.string(),
  status_code: v.literal('NOT_APPLICABLE'),
  reason_code: v.string(),
});

const EstimateGrabCoinErrorItemSchema = v.object({
  id: v.string(),
  status_code: v.literal('ERROR'),
  reason_code: v.string(),
});

/**
 * Valibot schema for {@link EstimateGrabCoinResult}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateGrabCoinResultSchema: v.GenericSchema<EstimateGrabCoinResult> = v.object({
  items: v.array(
    v.union([
      EstimateGrabCoinSuccessItemSchema,
      EstimateGrabCoinNotApplicableItemSchema,
      EstimateGrabCoinErrorItemSchema,
    ])
  ),
});

/**
 * Valibot schema for {@link EstimateGrabCoinResponse}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateGrabCoinResponseSchema: v.GenericSchema<EstimateGrabCoinResponse> = v.union([
  sdkOkResponseSchema(EstimateGrabCoinResultSchema),
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
