/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { TriggerCheckoutRequest, TriggerCheckoutResponse } from './type';

export class CheckoutModule extends ModuleBase {
  constructor() {
    super('CheckoutModule');
  }

  triggerCheckout(request: TriggerCheckoutRequest): Promise<TriggerCheckoutResponse> {
    return window.WrappedCheckoutModule.invoke('triggerCheckout', request);
  }
}
