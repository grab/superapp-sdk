/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { _BaseModule } from '../../core';
import { GetSelectedTravelDestinationResponseSchema } from './schemas';
import { GetSelectedTravelDestinationResponse } from './types';

/**
 * Module for reading user-related attributes from native code via JSBridge.
 *
 * @group Modules
 * @category User Attributes
 *
 * @remarks
 * Provides access to user and traveller attributes exposed via JSBridge.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const userAttributesModule = new SuperAppSDK.UserAttributesModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class UserAttributesModule extends _BaseModule {
  constructor() {
    super('UserAttributesModule');
  }

  /**
   * Returns the currently selected travel destination as a lowercase ISO 3166-1 alpha-2 country code.
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - travel destination retrieved successfully. The `result` is {@link GetSelectedTravelDestinationResult}.
   * - `204`: No content - no selected travel destination is currently available.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { UserAttributesModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the user attributes module
   * const userAttributes = new UserAttributesModule();
   *
   * // Read the selected travel destination
   * const response = await userAttributes.getSelectedTravelDestination();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Selected travel destination code:', response.result);
   *       break;
   *     case 204:
   *       console.log('Selected travel destination is not available');
   *       break;
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getSelectedTravelDestination(): Promise<GetSelectedTravelDestinationResponse> {
    const response = (await this.invoke({
      method: 'getSelectedTravelDestination',
    })) as GetSelectedTravelDestinationResponse;

    const responseError = this.validate(GetSelectedTravelDestinationResponseSchema, response);
    if (responseError)
      this.logger.warn(
        'getSelectedTravelDestination',
        `Unexpected response shape: ${responseError}`
      );

    return response;
  }
}
