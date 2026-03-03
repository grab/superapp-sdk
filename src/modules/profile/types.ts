/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Profile JSBridge module.
 */
export interface WrappedProfileModule {
  invoke(method: 'fetchEmail', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'verifyEmail', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedProfileModule?: WrappedProfileModule;
  }
}
