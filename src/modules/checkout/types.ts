/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Request parameters for triggering the checkout flow.
 *
 * @remarks
 * This type is intentionally flexible as the checkout parameters vary depending on the specific payment flow and partner requirements.
 * Consult the Grab SuperApp SDK documentation for the specific parameters required for your use case.
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
  /** Status of the transaction: "success", "failure", "pending", or "userInitiatedCancel". */
  status: string;
  /** Error message if the transaction failed. */
  errorMessage?: string;
  /** Error code associated with the failed transaction. */
  errorCode?: string;
};

/**
 * Response when triggering the checkout flow.
 *
 * @public
 */
export type TriggerCheckoutResponse = ConstrainedBridgeResponse<TriggerCheckoutResult, 200 | 400>;
