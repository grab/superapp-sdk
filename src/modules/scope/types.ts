/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Scope JSBridge module.
 */
export interface WrappedScopeModule {
  invoke(method: 'hasAccessTo', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'reloadScopes', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedScopeModule: WrappedScopeModule;
  }
}
