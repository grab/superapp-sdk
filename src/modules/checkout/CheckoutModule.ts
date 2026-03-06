/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { TriggerCheckoutRequest, TriggerCheckoutResponse } from './types';

/**
 * JSBridge module for triggering native payment flows.
 *
 * @group Modules
 *
 * @remarks
 * Invokes the native Grab checkout/pay component to process payments.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { CheckoutModule } from '@grabjs/superapp-sdk';
 * const checkoutModule = new CheckoutModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const checkoutModule = new SuperAppSDK.CheckoutModule();
 * </script>
 * ```
 *
 * @public
 */
export class CheckoutModule extends BaseModule {
  constructor() {
    super('CheckoutModule');
  }

  /**
   * Triggers the native checkout flow for payment processing.
   *
   * @param request - The checkout configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Checkout completed
   * - `400`: Bad request
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { CheckoutModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { CheckoutModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the checkout module
   * const checkoutModule = new CheckoutModule();
   *
   * // Trigger checkout with response params
   * try {
   *   const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
   *   const response = await checkoutModule.triggerCheckout(transactionResponse);
   *
   *   if (isResponseError(response)) {
   *     console.log('Transaction failed:', response.status_code, response.error);
   *   } else {
   *     if (isResponseOk(response)) {
   *       if (response.result.status === 'success') {
   *         console.log('Transaction successful:', response.result.transactionID);
   *       } else if (response.result.status === 'failure') {
   *         console.log('Transaction failed:', response.result.errorMessage, response.result.errorCode);
   *       } else if (response.result.status === 'pending') {
   *         console.log('Transaction pending:', response.result.transactionID);
   *       } else if (response.result.status === 'userInitiatedCancel') {
   *         console.log('User cancelled the checkout');
   *       }
   *     }
   *   }
   * } catch (error) {
   *   console.log('Could not trigger checkout:', error);
   * }
   * ```
   *
   * @public
   */
  triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return this.wrappedModule.invoke('triggerCheckout', request);
  }
}
