/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { TriggerCheckoutRequest, TriggerCheckoutResponse, TriggerCheckoutResult } from './types';

/**
 * JSBridge module for triggering native payment flows.
 *
 * @group Modules
 *
 * @remarks
 * Invokes the native Grab checkout/pay component to process payments.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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
   * @param request - The response from Grab payment charge init endpoint.
   *
   * @returns Resolves with the transaction details on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Trigger checkout with response params
   * ```typescript
   * const chargeInitResponse = await chargeInit(); // Get from Grab payment charge init endpoint
   * const response = await checkoutModule.triggerCheckout(chargeInitResponse);
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await checkoutModule.triggerCheckout({ responseParams });
   *   switch (status_code) {
   *     case 200:
   *       console.log('Transaction successful:', result.transactionID, result.status);
   *       break;
   *     default:
   *       console.log(`Transaction failed${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not trigger checkout${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return this.wrappedModule.invoke<TriggerCheckoutResult>('triggerCheckout', request);
  }
}
