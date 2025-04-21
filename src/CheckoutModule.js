/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export class CheckoutModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'CheckoutModule');
  }

  triggerCheckout(checkoutDetails) {
    return window.WrappedCheckoutModule.invoke('triggerCheckout', checkoutDetails);
  }
}
