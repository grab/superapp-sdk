/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { DismissSplashScreenResponse } from './types';

/**
 * JSBridge module for controlling the native splash / Lottie loading screen.
 *
 * @group Modules
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const splash = new SuperAppSDK.SplashScreenModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class SplashScreenModule extends BaseModule {
  constructor() {
    super('SplashScreenModule');
  }

  /**
   * Dismisses the native splash (Lottie) loading view if it is presented.
   *
   * @returns `204` when there is no splash or it was dismissed; `400` / `403` for client or scope errors.
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
    return (await this.invoke({
      method: 'dismiss',
    })) as DismissSplashScreenResponse;
  }
}
