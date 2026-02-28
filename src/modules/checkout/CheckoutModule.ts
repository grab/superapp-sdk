/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import { TriggerCheckoutRequest, TriggerCheckoutResponse } from './types';

/**
 * Provides APIs to trigger native checkout flow from web.
 *
 * @remarks
 * The CheckoutModule enables miniapps to initiate payment transactions through the Grab app's
 * native checkout interface. All payment processing and user interactions are handled by the
 * native platform.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { CheckoutModule } from '@grabjs/superapp-sdk';
 *
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
 */
class CheckoutModule extends BaseModule {
  constructor() {
    super('CheckoutModule');
  }

  /**
   * Trigger the native checkout flow.
   *
   * @remarks
   * This method initiates the native payment checkout flow within the Grab app.
   * The `responseParams` should be obtained from your charge initialization endpoint.
   *
   * **Result Object:**
   * - `transactionID`: Unique identifier for the transaction at Grab side
   * - `status`: Status of the transaction
   * - `errorReason`: The reason why the transaction failed (if applicable)
   * - `errorCode`: Error code associated with the failed transaction (if applicable)
   *
   * @param request - Request parameters for triggering checkout.
   *
   * @returns Promise that resolves to {@link TriggerCheckoutResponse} with transaction details.
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   const responseParams = await chargeInit();
   *   const response = await checkoutModule.triggerCheckout({ responseParams });
   *   if (response.status_code === 200) {
   *     console.log('Transaction ID:', response.result.transactionID);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const responseParams = await chargeInit();
   *   const response = await checkoutModule.triggerCheckout({ responseParams });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Transaction ID:', response.result.transactionID);
   *       console.log('Status:', response.result.status);
   *       if (response.result.errorCode) {
   *         console.error('Error Code:', response.result.errorCode);
   *         console.error('Error Reason:', response.result.errorReason);
   *       }
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 403:
   *       console.error('Permission denied:', response.error);
   *       break;
   *     case 500:
   *       console.error('Checkout error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return window.WrappedCheckoutModule.invoke('triggerCheckout', request);
  }
}

export default CheckoutModule;
