/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';
import { DataStream } from '../../core/stream';

/**
 * Concrete interface for the native Media JSBridge module.
 */
export interface WrappedMediaModule {
  invoke(method: 'playDRMContent', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'observePlayDRMContent', params?: any): DataStream<any>;
}

declare global {
  interface Window {
    WrappedMediaModule?: WrappedMediaModule;
  }
}
