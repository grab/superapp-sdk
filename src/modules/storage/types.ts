/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Storage JSBridge module.
 */
export interface WrappedStorageModule {
  invoke(method: 'setBoolean', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'getBoolean', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'setInt', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'getInt', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'setString', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'getString', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'setDouble', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'getDouble', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'remove', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'removeAll', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedStorageModule?: WrappedStorageModule;
  }
}
