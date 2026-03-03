/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Container JSBridge module.
 */
export interface WrappedContainerModule {
  invoke(method: 'setBackgroundColor', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'setTitle', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'hideBackButton', params?: any): Promise<any>;
  invoke(method: 'showBackButton', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'hideRefreshButton', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'showRefreshButton', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'close', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'onContentLoaded', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'showLoader', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'hideLoader', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'openExternalLink', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'onCtaTap', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'sendAnalyticsEvent', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'getSessionParams', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedContainerModule: WrappedContainerModule;
  }
}
