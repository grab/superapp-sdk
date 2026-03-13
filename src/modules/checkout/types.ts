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
 * @example
 * **Typical checkout request:**
 * ```typescript
 * {
 *   partnerTxID: 'txn-123456',
 *   partnerGroupTxID: 'group-txn-789',
 *   amount: 10000,
 *   currency: 'SGD',
 *   description: 'Payment for services',
 *   // ... additional checkout-specific parameters
 * }
 * ```
 *
 * @public
 */
export type TriggerCheckoutRequest = Record<string, unknown>;

/**
 * Result object containing the checkout transaction details.
 *
 * @example
 * **Successful transaction:**
 * ```typescript
 * {
 *   transactionID: 'grab-txn-abc123',
 *   status: 'success'
 * }
 * ```
 *
 * @example
 * **Failed transaction:**
 * ```typescript
 * {
 *   transactionID: 'grab-txn-abc123',
 *   status: 'failure',
 *   errorMessage: 'Insufficient funds',
 *   errorCode: 'PAYMENT_FAILED'
 * }
 * ```
 *
 * @example
 * **Pending transaction:**
 * ```typescript
 * {
 *   transactionID: 'grab-txn-abc123',
 *   status: 'pending'
 * }
 * ```
 *
 * @example
 * **User cancelled:**
 * ```typescript
 * {
 *   transactionID: 'grab-txn-abc123',
 *   status: 'userInitiatedCancel'
 * }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Checkout completed successfully. The `result` contains transaction details.
 * - `400`: Bad request - invalid checkout parameters.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - payment successful:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: {
 *     transactionID: 'grab-txn-abc123',
 *     status: 'success'
 *   }
 * }
 * ```
 *
 * @example
 * **Success response (200) - payment failed:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: {
 *     transactionID: 'grab-txn-abc123',
 *     status: 'failure',
 *     errorMessage: 'Insufficient funds',
 *     errorCode: 'PAYMENT_FAILED'
 *   }
 * }
 * ```
 *
 * @example
 * **Success response (200) - user cancelled:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: {
 *     transactionID: 'grab-txn-abc123',
 *     status: 'userInitiatedCancel'
 *   }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid checkout parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @example
 * **Internal server error response (500):**
 * ```typescript
 * {
 *   status_code: 500,
 *   error: 'Internal server error'
 * }
 * ```
 *
 * @public
 */
export type TriggerCheckoutResponse = ConstrainedBridgeResponse<
  TriggerCheckoutResult,
  200 | 400 | 500 | 501
>;
