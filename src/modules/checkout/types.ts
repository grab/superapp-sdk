/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Checkout JSBridge module.
 */
export interface WrappedCheckoutModule {
  invoke(method: 'triggerCheckout', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedCheckoutModule?: WrappedCheckoutModule;
  }
}
