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
   * @param request - Payment transaction details, including the transaction ID and amount.
   *
   * @returns The checkout result, containing transaction status (success, failure, or pending) and transaction details.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the checkout module
   * const checkoutModule = new CheckoutModule();
   *
   * // Trigger checkout with response params
   * try {
   *   const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
   *   const response = await checkoutModule.triggerCheckout(transactionResponse);
   *
   *   switch (response.status_code) {
   *     case 200:
   *       if (response.result.status === 'success') {
   *         console.log('Transaction successful:', response.result.transactionID);
   *       } else if (response.result.status === 'failure') {
   *         console.log('Transaction failed:', response.result.errorMessage, response.result.errorCode);
   *       } else if (response.result.status === 'pending') {
   *         console.log('Transaction pending:', response.result.transactionID);
   *       } else if (response.result.status === 'userInitiatedCancel') {
   *         console.log('User cancelled the checkout');
   *       }
   *       break;
   *     case 400:
   *       console.log('Transaction failed:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (error) {
   *   console.log('Could not trigger checkout:', error);
   * }
   * ```
   *
   * @public
   */
  async triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return (await this.invoke('triggerCheckout', request)) as TriggerCheckoutResponse;
  }
}
