/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKOkResponse } from '../../core';

/**
 * Per-item status code returned by the rewards estimation service.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type RewardItemStatusCode = 'SUCCESS' | 'NOT_APPLICABLE' | 'ERROR';

/**
 * A single item to include in a rewards estimation request.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsRequestItem = {
  /** Partner-defined identifier for this item (for example, `"trip-456"`). */
  id: string;
  /** Transaction amount in minor currency units (for example, `75000` for SGD 750.00). */
  amount_in_minor_units: number;
  /** ISO 4217 currency code, exactly 3 characters (for example, `"SGD"`). */
  currency_code: string;
};

/**
 * Request parameters for estimating rewards.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsRequest = {
  /** List of items to estimate rewards for. Must contain at least one item. */
  items: EstimateRewardsRequestItem[];
};

/**
 * Reward amount for a successfully estimated item.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsReward = {
  /** Numeric reward amount (for example, `492`). */
  amount: number;
  /** Reward currency code (for example, `"GRAB-POINT"`). */
  currency_code: string;
  /** Human-readable reward amount (for example, `"492"` or `"3,750"`). */
  display_amount: string;
};

/**
 * Estimated fiat equivalent of the reward.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimatedFiat = {
  /** Estimated fiat value in minor currency units (for example, `328` for MYR 3.28). */
  amount_in_minor_units: number;
  /** ISO 4217 currency code (for example, `"MYR"`). */
  currency_code: string;
};

/**
 * Result for an item that was successfully estimated.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsSuccessItem = {
  /** Item identifier matching the request. */
  id: string;
  status_code: 'SUCCESS';
  result: {
    reward: EstimateRewardsReward;
    /** Present when fiat equivalent metadata is available; absent otherwise. */
    estimated_fiat?: EstimatedFiat;
  };
};

/**
 * Reason code for a `NOT_APPLICABLE` item.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsNotApplicableReasonCode = 'country_restriction' | 'invalid_currency';

/**
 * Reason code for an `ERROR` item.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsErrorReasonCode = 'estimate_failed';

/**
 * Result for an item that could not be estimated (for example, unsupported currency or country restriction).
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsNotApplicableItem = {
  /** Item identifier matching the request. */
  id: string;
  status_code: 'NOT_APPLICABLE';
  reason_code: EstimateRewardsNotApplicableReasonCode;
};

/**
 * Result for an item where estimation failed due to a processing error.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsErrorItem = {
  /** Item identifier matching the request. */
  id: string;
  status_code: 'ERROR';
  reason_code: EstimateRewardsErrorReasonCode;
};

/**
 * Per-item estimation result, discriminated by `status_code`.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsResultItem =
  | EstimateRewardsSuccessItem
  | EstimateRewardsNotApplicableItem
  | EstimateRewardsErrorItem;

/**
 * Result object containing per-item reward estimates.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsResult = {
  /** Estimation result for each item in the request. */
  items: EstimateRewardsResultItem[];
};

/**
 * Response when estimating rewards.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateRewardsResponse =
  | SDKOkResponse<EstimateRewardsResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
