/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import { TriggerCheckoutResponseSchema, TriggerCheckoutResultSchema } from './schemas';

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
export type TriggerCheckoutResult = InferOutput<typeof TriggerCheckoutResultSchema>;

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
 * @public
 */
export type TriggerCheckoutResponse = InferOutput<typeof TriggerCheckoutResponseSchema>;
