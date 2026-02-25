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
   * @returns Promise that resolves when navigation completes
   *
   * @example
   * ```javascript
   * platformModule.back()
   *   .then(({ result, error }) => {
   *     if (!!result) {
   *       // There is a valid result.
   *     } else if (!!error) {
   *       // Some error happened.
   *     }
   *   });
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
