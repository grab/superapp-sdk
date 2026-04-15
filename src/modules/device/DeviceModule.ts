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
 * JSBridge module for querying native device information.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to device checks exposed by the native Grab app bridge.
 * This code must run on the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { DeviceModule } from '@grabjs/superapp-sdk';
 * const deviceModule = new DeviceModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const deviceModule = new SuperAppSDK.DeviceModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class DeviceModule extends BaseModule {
  constructor() {
    super('DeviceModule');
  }

  /**
   * Checks whether the current device supports eSIM.
   *
   * @returns Whether eSIM is supported on the current device. See {@link IsEsimSupportedResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { DeviceModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the device module
   * const device = new DeviceModule();
   *
   * // Check eSIM support
   * const response = await device.isEsimSupported();
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
    const response = (await this.invoke({
      method: 'isEsimSupported',
    })) as IsEsimSupportedResponse;

    const responseError = this.validate(IsEsimSupportedResponseSchema, response);
    if (responseError)
      this.logger.warn('isEsimSupported', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
