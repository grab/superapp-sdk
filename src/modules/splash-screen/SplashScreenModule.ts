/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { _BaseModule } from '../../core';
import { DismissSplashScreenResponseSchema } from './schemas';
import { DismissSplashScreenResponse } from './types';

/**
 * Module for controlling the native splash / Lottie loading screen via JSBridge.
 *
 * @group Modules
 * @category Splash Screen
 *
 * @remarks
 * Dismisses the splash overlay once the MiniApp is ready. Requires the Grab SuperApp WebView.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { SplashScreenModule } from '@grabjs/superapp-sdk';
 * const splash = new SplashScreenModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const splash = new SuperAppSDK.SplashScreenModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class SplashScreenModule extends _BaseModule {
  constructor() {
    super('SplashScreenModule');
  }

  /**
   * Dismisses the native splash (Lottie) loading view if it is presented.
   *
   * @returns A response with one of the following status codes:
   * - `204`: No content - splash screen was closed successfully.
   * - `400`: Bad request - invalid input (Grablet / client validation error).
   * - `403`: Forbidden - missing consent for the required OAuth scope.
   * - `500`: Internal server error - unexpected error while invoking the native JSBridge.
   * - `501`: Not implemented - not in the Grab app WebView environment.
   *
   * @example
   * ```typescript
   * import { SplashScreenModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * const splashScreen = new SplashScreenModule();
   * const response = await splashScreen.dismiss();
   *
   * if (isSuccess(response)) {
   *   console.log('dismissed splash screen successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async dismiss(): Promise<DismissSplashScreenResponse> {
    const response = (await this.invoke({
      method: 'dismiss',
    })) as DismissSplashScreenResponse;

    const responseError = this.validate(DismissSplashScreenResponseSchema, response);
    if (responseError) this.logger.warn('dismiss', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
