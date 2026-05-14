/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKOkResponse } from '../../core';

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
 * @group Modules
 * @category Checkout
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
 * **User cancelled or closed checkout:**
 * ```typescript
 * {
 *   status: 'userInitiatedCancel'
 * }
 * ```
 *
 * @group Modules
 * @category Checkout
 *
 * @public
 */
export type TriggerCheckoutResult =
  | { status: 'success'; transactionID: string }
  | {
      status: 'failure';
      transactionID: string;
      errorMessage: string;
      errorCode: string;
    }
  | { status: 'pending'; transactionID: string }
  | { status: 'userInitiatedCancel' };

/**
 * Response returned by {@link CheckoutModule.triggerCheckout}.
 *
 * @group Modules
 * @category Checkout
 *
 * @public
 */
export type TriggerCheckoutResponse =
  | SDKOkResponse<TriggerCheckoutResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
