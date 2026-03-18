/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
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
 * @noInheritDoc
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
   * @example
   * **Simple usage**
   * ```typescript
   * import { CheckoutModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the checkout module
   * const checkoutModule = new CheckoutModule();
   *
   * // Trigger checkout with response params
   * const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
   * const response = await checkoutModule.triggerCheckout(transactionResponse);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Transaction ID:', response.result.transactionID);
   *   switch (response.result.status) {
   *     case 'success':
   *       console.log('Transaction successful');
   *       break;
   *     case 'failure':
   *       console.log('Transaction failed:', response.result.errorMessage, response.result.errorCode);
   *       break;
   *     case 'pending':
   *       console.log('Transaction pending');
   *       break;
   *     case 'userInitiatedCancel':
   *       console.log('User cancelled the checkout');
   *       break;
   *   }
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return (await this.invoke({
      method: 'triggerCheckout',
      params: request,
    })) as TriggerCheckoutResponse;
  }
}
