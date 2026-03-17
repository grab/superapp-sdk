/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { GetSelectedTravelDestinationResponse } from './types';

/**
 * JSBridge module for reading user-related attributes from native code.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to user and traveller attributes exposed by the native Grab app bridge.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { UserAttributesModule } from '@grabjs/superapp-sdk';
 * const userAttributesModule = new UserAttributesModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const userAttributesModule = new SuperAppSDK.UserAttributesModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class UserAttributesModule extends BaseModule {
  constructor() {
    super('UserAttributesModule');
  }

  /**
   * Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.
   *
   * @returns The selected travel destination lowercase ISO 3166-1 alpha-2 country code when available.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the user attributes module
   * const userAttributesModule = new UserAttributesModule();
   *
   * // Read the selected travel destination
   * const response = await userAttributesModule.getSelectedTravelDestination();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Selected travel destination code:', response.result);
   *     break;
   *   case 204:
   *     console.log('Selected travel destination is not available');
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
  async getSelectedTravelDestination(): Promise<GetSelectedTravelDestinationResponse> {
    return (await this.invoke({
      method: 'getSelectedTravelDestination',
    })) as GetSelectedTravelDestinationResponse;
  }
}
