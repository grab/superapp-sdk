/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Concrete interface for the native Identity JSBridge module.
 */
export interface WrappedIdentityModule {
  invoke(method: 'authorize', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'getAuthorizationArtifacts', params?: any): Promise<BridgeResponse<any>>;
  invoke(method: 'clearAuthorizationArtifacts', params?: any): Promise<BridgeResponse<any>>;
}

declare global {
  interface Window {
    WrappedIdentityModule?: WrappedIdentityModule;
  }
}
