/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { TriggerCheckoutRequest, TriggerCheckoutResponse, TriggerCheckoutResult } from './type';

/**
 * The CheckoutModule provides APIs to trigger native checkout flow from web.
 *
 * @example
 * ```javascript
 * import { CheckoutModule } from "@grabjs/superapp-sdk";
 *
 * // Ideally, initialize this only once and reuse across app.
 * const checkoutModule = new CheckoutModule();
 * ```
 */
class CheckoutModule extends ModuleBase {
  constructor() {
    super('CheckoutModule');
  }

  /**
   * Trigger the native checkout flow.
   *
   * @param request - Checkout request parameters
   * @param request.responseParams - The response params that partners get when charge init endpoint is called
   * @returns Promise that resolves to checkout response with transaction details
   *
   * The result object contains:
   * - `transactionID`: Unique identifier for the transaction at Grab side
   * - `status`: Status of the transaction
   * - `errorReason`: The reason why the transaction failed
   * - `errorCode`: Error code associated with the failed transaction
   *
   * @example
   * ```javascript
   * // Get responseParams from chargeInit endpoint
   * const responseParams = await chargeInit(); // This is a dummy function
   *
   * checkoutModule
   *   .triggerCheckout({ responseParams })
   *   .then(({ result, error }) => {
   *     if (result) {
   *       // There is a valid result.
   *       console.log("Transaction ID:", result.transactionID);
   *       console.log("Status:", result.status);
   *     } else if (error) {
   *       // Some error happened.
   *     }
   *   });
   * ```
   */
  triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return window.WrappedCheckoutModule.invoke('triggerCheckout', request);
  }
}

export default CheckoutModule;

export type {
  // TriggerCheckout
  TriggerCheckoutRequest,
  TriggerCheckoutResponse,
  TriggerCheckoutResult,
};
