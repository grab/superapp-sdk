/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { IsEsimSupportedResponseSchema } from './schemas';
import { IsEsimSupportedResponse } from './types';

/**
 * JSBridge module for querying native device capability information.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to device capability checks exposed by the native Grab app bridge.
 * This code must run on the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { DeviceCapabilityModule } from '@grabjs/superapp-sdk';
 * const deviceCapabilityModule = new DeviceCapabilityModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const deviceCapabilityModule = new SuperAppSDK.DeviceCapabilityModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class DeviceCapabilityModule extends BaseModule {
  constructor() {
    super('DeviceCapabilityModule');
  }

  /**
   * Checks whether the current device supports eSIM.
   *
   * @returns Whether eSIM is supported on the current device. See {@link IsEsimSupportedResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { DeviceCapabilityModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the device capability module
   * const deviceCapability = new DeviceCapabilityModule();
   *
   * // Check eSIM support
   * const response = await deviceCapability.isEsimSupported();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('eSIM supported:', response.result);
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async isEsimSupported(): Promise<IsEsimSupportedResponse> {
    return (await this.invoke({
      method: 'isEsimSupported',
      responseSchema: IsEsimSupportedResponseSchema,
    })) as IsEsimSupportedResponse;
  }
}
