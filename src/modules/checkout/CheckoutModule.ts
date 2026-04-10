/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { TriggerCheckoutRequestSchema, TriggerCheckoutResponseSchema } from './schemas';
import { TriggerCheckoutRequest, TriggerCheckoutResponse } from './types';

/**
 * JSBridge module for triggering native payment flows.
 *
 * @group Modules
 *
 * @remarks
 * Invokes the native Grab checkout/pay component to process payments.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
   * @remarks
   * You must create a transaction on your backend (via API POST https://partner-api.grab.com/grabpay/partner/v4/charge/init) **before** calling this method.
   * Pass the transaction parameters returned from that API call as the `request` argument.
   * Calling this method without a valid pre-created transaction will result in a checkout failure.
   *
   * @param request - Payment transaction details, including the transaction ID and amount. See {@link TriggerCheckoutRequest}.
   *
   * @returns The checkout result, containing transaction status (success, failure, pending, or userInitiatedCancel) and transaction details. See {@link TriggerCheckoutResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { CheckoutModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the checkout module
   * const checkout = new CheckoutModule();
   *
   * // Trigger checkout with response params
   * const transactionResponse = await createTransaction(); // Call POST /grabpay/partner/v4/charge/init from Grab API to create a transaction
   * const response = await checkout.triggerCheckout(transactionResponse);
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
   * } else if (isError(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('No permission to trigger checkout');
   *       // Trigger IdentityModule.authorize() for scope 'mobile.checkout', then reload via ScopeModule.reloadScopes() and try again
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    const requestError = this.validate(TriggerCheckoutRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'triggerCheckout',
      params: request,
    })) as TriggerCheckoutResponse;

    const responseError = this.validate(TriggerCheckoutResponseSchema, response);
    if (responseError)
      this.logger.warn('triggerCheckout', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
