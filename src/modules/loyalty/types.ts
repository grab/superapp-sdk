/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKOkResponse } from '../../core';

/**
 * ISO 4217 currency code or Grab-specific reward currency (for example, `"MYR"`, `"SGD"`, `"GRAB-POINT"`).
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type CurrencyCode = string;

/**
 * Per-item status code returned by the Horus rewards estimation service.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type HorusItemStatusCode = 'SUCCESS' | 'NOT_APPLICABLE' | 'ERROR';

/**
 * A single item to include in a GrabCoin estimation request.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinRequestItem = {
  /** Partner-defined identifier for this item (for example, `"trip-456"`). */
  id: string;
  /** Transaction amount in minor currency units (for example, `75000` for SGD 750.00). */
  amount_in_minor_units: number;
  /** ISO 4217 currency code (for example, `"SGD"`). */
  currency_code: CurrencyCode;
};

/**
 * Request parameters for estimating GrabCoin rewards.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinRequest = {
  /** List of items to estimate rewards for. Must contain at least one item. */
  items: EstimateGrabCoinRequestItem[];
};

/**
 * GrabCoin reward amount for a successfully estimated item.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type GrabCoinReward = {
  /** Numeric reward amount (for example, `492`). */
  amount: number;
  /** Reward currency code (for example, `"GRAB-POINT"`). */
  currency_code: CurrencyCode;
  /** Human-readable reward amount (for example, `"492"` or `"3,750"`). */
  display_amount: string;
};

/**
 * Estimated fiat equivalent of the GrabCoin reward.
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
  currency_code: CurrencyCode;
};

/**
 * Result for an item that was successfully estimated.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinSuccessItem = {
  /** Item identifier matching the request. */
  id: string;
  status_code: 'SUCCESS';
  result: {
    reward: GrabCoinReward;
    /** Present when Abacus returns fiat metadata; absent otherwise. */
    estimated_fiat?: EstimatedFiat;
  };
};

/**
 * Result for an item that could not be estimated (for example, unsupported currency or country restriction).
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinNotApplicableItem = {
  /** Item identifier matching the request. */
  id: string;
  status_code: 'NOT_APPLICABLE';
  /** Machine-readable reason (for example, `"country_restriction"`, `"invalid_currency"`). */
  reason_code: string;
};

/**
 * Result for an item where estimation failed due to a processing error.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinErrorItem = {
  /** Item identifier matching the request. */
  id: string;
  status_code: 'ERROR';
  /** Machine-readable error reason. */
  reason_code: string;
};

/**
 * Per-item estimation result, discriminated by `status_code`.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinResultItem =
  | EstimateGrabCoinSuccessItem
  | EstimateGrabCoinNotApplicableItem
  | EstimateGrabCoinErrorItem;

/**
 * Result object containing per-item GrabCoin estimates.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinResult = {
  /** Estimation result for each item in the request. */
  items: EstimateGrabCoinResultItem[];
};

/**
 * Response when estimating GrabCoin rewards.
 *
 * @group Modules
 * @category Loyalty
 *
 * @public
 */
export type EstimateGrabCoinResponse =
  | SDKOkResponse<EstimateGrabCoinResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
