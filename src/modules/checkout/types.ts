/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Request parameters for triggering the checkout flow.
 *
 * @public
 */
export type TriggerCheckoutRequest = Record<string, unknown>;

/**
 * Result object containing the checkout transaction details.
 *
 * @public
 */
export type TriggerCheckoutResult = {
  /** Unique identifier for the transaction at Grab side. */
  transactionID: string;
  /** Status of the transaction. */
  status: string;
  /** The reason why the transaction failed. */
  errorReason?: string;
  /** Error code associated with the failed transaction. */
  errorCode?: string;
};

/**
 * Response when triggering the checkout flow.
 *
 * @public
 */
export type TriggerCheckoutResponse = BridgeResponse<TriggerCheckoutResult>;
