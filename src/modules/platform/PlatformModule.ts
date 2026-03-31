/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { BackResponseSchema } from './schemas';
import { BackResponse } from './types';

/**
 * JSBridge module for controlling platform navigation.
 *
 * @group Modules
 *
 * @remarks
 * Provides methods to interact with the native platform navigation stack, such as triggering the back action.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * @noInheritDoc
 */
export class PlatformModule extends BaseModule {
  constructor() {
    super('PlatformModule');
  }

  /**
   * Triggers the native platform back navigation.
   * This navigates back in the native navigation stack.
   *
   * @returns Confirmation that the back navigation was triggered. See {@link BackResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { PlatformModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the platform module
   * const platform = new PlatformModule();
   *
   * // Trigger back navigation
   * const response = await platform.back();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Back navigation triggered');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async back(): Promise<BackResponse> {
    return (await this.invoke({
      method: 'back',
      responseSchema: BackResponseSchema,
    })) as BackResponse;
  }
}
