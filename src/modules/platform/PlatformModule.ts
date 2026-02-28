/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import type { BackResponse } from './types';

/**
 * Provides API to navigate back to the host application.
 *
 * @remarks
 * The PlatformModule enables miniapps to trigger native back navigation,
 * closing the current webview and returning the user to the previous screen in the Grab app.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { PlatformModule } from '@grabjs/superapp-sdk';
 *
 * const platformModule = new PlatformModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const platformModule = new SuperAppSDK.PlatformModule();
 * </script>
 * ```
 */
class PlatformModule extends BaseModule {
  constructor() {
    super('PlatformModule');
  }

  /**
   * Close the current view and navigate back to the host application.
   *
   * @remarks
   * This method triggers the native back navigation, which closes the current webview
   * and returns the user to the previous screen in the Grab app.
   *
   * @returns Promise that resolves to {@link BackResponse} when navigation completes.
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   await platformModule.back();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Back button handler:
   * ```typescript
   * backButton.addEventListener('click', async () => {
   *   try {
   *     await platformModule.back();
   *   } catch (error) {
   *     console.error(error);
   *   }
   * });
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await platformModule.back();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Navigation successful');
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 500:
   *       console.error('Navigation error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  back(): Promise<BackResponse> {
    return window.WrappedPlatformModule.invoke('back');
  }
}

export default PlatformModule;
