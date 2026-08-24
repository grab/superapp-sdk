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
 * SDK module for controlling platform navigation via `JSBridge`.
 *
 * @group Modules
 * @category Platform
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
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
   * @returns This method can return the following `status_code` values:
   * - `204` (No Content): Back navigation triggered successfully.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
    const response = (await this.invoke({
      method: 'back',
    })) as BackResponse;

    const responseError = this.validate(BackResponseSchema, response);
    if (responseError) this.logger.warn('back', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
