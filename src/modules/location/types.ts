/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';
import { DataStream } from '../../core/stream';

/**
 * Concrete interface for the native Location JSBridge module.
 */
export interface WrappedLocationModule {
  invoke(method: 'getCoordinate', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'observeLocationChange', params?: any): DataStream<any>;
  invoke(method: 'getCountryCode', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedLocationModule: WrappedLocationModule;
  }
}
