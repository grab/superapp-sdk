/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Locale JSBridge module.
 */
export interface WrappedLocaleModule {
  invoke(method: 'getLanguageLocaleIdentifier', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedLocaleModule: WrappedLocaleModule;
  }
}
