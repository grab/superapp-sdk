/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { BackResponse } from './types';

/**
 * JSBridge module for controlling platform navigation.
 *
 * @group Modules
 *
 * @remarks
 * Provides methods to interact with the native platform navigation stack, such as triggering the back action.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { PlatformModule } from '@grabjs/superapp-sdk';
 * const platform = new PlatformModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const platform = new SuperAppSDK.PlatformModule();
 * </script>
 * ```
 *
 * @public
 */
export class PlatformModule extends BaseModule {
  constructor() {
    super('PlatformModule');
  }

  /**
   * Triggers the native platform back navigation.
   * This navigates back in the native navigation stack.
   *
   * @returns Confirmation that the back navigation was triggered.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the platform module
   * const platformModule = new PlatformModule();
   *
   * // Trigger back navigation
   * const response = await platformModule.back();
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('Back navigation triggered');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async back(): Promise<BackResponse> {
    return (await this.invoke('back')) as BackResponse;
  }
}
