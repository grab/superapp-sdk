/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

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
   * @returns A promise that resolves to a `204` status code when back navigation is triggered.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { PlatformModule, isResponseNoContent } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { PlatformModule, isResponseNoContent } = window.SuperAppSDK;
   *
   * // Initialize the platform module
   * const platformModule = new PlatformModule();
   *
   * // Trigger back navigation
   * try {
   *   const response = await platformModule.back();
   *
   *   if (isResponseNoContent(response)) {
   *     console.log('Back navigation triggered');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  back() {
    return this.wrappedModule.invoke('back');
  }
}
