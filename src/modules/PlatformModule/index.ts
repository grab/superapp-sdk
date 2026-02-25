/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { BackResponse } from './type';

/**
 * The PlatformModule provides API to navigate back to the host application.
 *
 * @example
 * ```javascript
 * import { PlatformModule } from '@grabjs/superapp-sdk';
 *
 * // Ideally, initialize this only once and reuse across app.
 * const platformModule = new PlatformModule();
 * ```
 */
class PlatformModule extends ModuleBase {
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
   * ```javascript
   * // Navigate back after completing a task
   * platformModule.back()
   *   .then(({ result, error, status_code }) => {
   *     if (result || status_code === 200) {
   *       console.log("Navigation successful");
   *     } else if (error) {
   *       console.error("Navigation error:", error);
   *     }
   *   });
   *
   * // Example: Back button handler
   * backButton.addEventListener('click', () => {
   *   platformModule.back();
   * });
   * ```
   */
  back(): Promise<BackResponse> {
    return window.WrappedPlatformModule.invoke('back');
  }
}

export default PlatformModule;

export type {
  // Back
  BackResponse,
} from './type';
