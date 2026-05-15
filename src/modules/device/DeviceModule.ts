/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { IsEsimSupportedResponseSchema } from './schemas';
import { IsEsimSupportedResponse } from './types';

/**
 * JSBridge module for querying native device information.
 *
 * @group Modules
 * @category Device
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const deviceModule = new SuperAppSDK.DeviceModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class DeviceModule extends BaseModule {
  static readonly MINIMUM_VERSION: Version = { major: 5, minor: 409, patch: 0 };

  constructor() {
    super('DeviceModule');
  }

  /**
   * Checks whether the current device supports eSIM.
   *
   * @minimumGrabAppVersion Android: 5.402.0, iOS: 5.402.0
   *
   * @requiredOAuthScope mobile.device
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
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('No permission to query eSIM support');
   *       // Trigger IdentityModule.authorize() for scope 'mobile.device', then reload via ScopeModule.reloadScopes() and try again
   *       break;
   *     case 426:
   *       console.log('User needs to upgrade the app');
   *       // Advise user to upgrade app
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async isEsimSupported(): Promise<IsEsimSupportedResponse> {
    const supportError = this.checkSupport((appInfo) =>
      meetsMinimumVersion(appInfo.version, DeviceModule.MINIMUM_VERSION)
    );
    if (supportError) return supportError;

    const response = (await this.invoke({
      method: 'isEsimSupported',
    })) as IsEsimSupportedResponse;

    const responseError = this.validate(IsEsimSupportedResponseSchema, response);
    if (responseError)
      this.logger.warn('isEsimSupported', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
