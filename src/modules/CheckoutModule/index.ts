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
   * @param request - Checkout request parameters.
   *   - `responseParams`: The response params from the charge init endpoint
   *
   * @returns Promise that resolves to {@link TriggerCheckoutResponse} with transaction details.
   *
   * @example
   * ```javascript
   * // Get responseParams from chargeInit endpoint
   * const responseParams = await chargeInit(); // Replace with your actual endpoint
   *
   * checkoutModule
   *   .triggerCheckout({ responseParams })
   *   .then(({ result, error, status_code }) => {
   *     if (result) {
   *       console.log("Transaction ID:", result.transactionID);
   *       console.log("Status:", result.status);
   *       
   *       if (result.errorCode) {
   *         console.error("Error Code:", result.errorCode);
   *         console.error("Error Reason:", result.errorReason);
   *       }
   *     } else if (error) {
   *       console.error("Checkout error:", error);
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
