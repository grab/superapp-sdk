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
  EstimateRewardsRequest,
  EstimateRewardsResponse,
  EstimateRewardsResult,
} from './types';

/**
 * Valibot schema for a single {@link EstimateRewardsRequestEntry}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateRewardsRequestEntrySchema = v.object({
  id: v.pipe(v.string(), v.minLength(1)),
  amount_in_minor_units: v.pipe(v.number(), v.integer(), v.minValue(1)),
  currency_code: v.pipe(v.string(), v.length(3)),
});

/**
 * Valibot schema for {@link EstimateRewardsRequest}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateRewardsRequestSchema: v.GenericSchema<EstimateRewardsRequest> = v.pipe(
  v.object({
    items: v.pipe(v.array(EstimateRewardsRequestEntrySchema), v.minLength(1)),
  }),
  v.check(
    ({ items }) => new Set(items.map((item) => item.id)).size === items.length,
    'Duplicate entry id detected'
  )
);

const EstimatedFiatSchema: v.GenericSchema<EstimatedFiat> = v.object({
  amount_in_minor_units: v.number(),
  currency_code: v.string(),
});

const EstimateRewardsSuccessEntrySchema = v.object({
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

const EstimateRewardsNotApplicableEntrySchema = v.object({
  id: v.string(),
  status_code: v.literal('NOT_APPLICABLE'),
  reason_code: v.picklist(['country_restriction', 'invalid_currency']),
});

const EstimateRewardsErrorEntrySchema = v.object({
  id: v.string(),
  status_code: v.literal('ERROR'),
  reason_code: v.literal('estimate_failed'),
});

/**
 * Valibot schema for {@link EstimateRewardsResult}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateRewardsResultSchema: v.GenericSchema<EstimateRewardsResult> = v.object({
  items: v.array(
    v.union([
      EstimateRewardsSuccessEntrySchema,
      EstimateRewardsNotApplicableEntrySchema,
      EstimateRewardsErrorEntrySchema,
    ])
  ),
});

/**
 * Valibot schema for {@link EstimateRewardsResponse}.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export const EstimateRewardsResponseSchema: v.GenericSchema<EstimateRewardsResponse> = v.union([
  sdkOkResponseSchema(EstimateRewardsResultSchema),
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
