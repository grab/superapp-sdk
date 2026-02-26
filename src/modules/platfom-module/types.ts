/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse, Invoke } from '../../core';

/**
 * Success response when back navigation is successful
 */
export type BackSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response when back navigation fails
 */
export type BackErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request
   * - `500`: Internal error during navigation
   */
  status_code: 400 | 500;
};

/**
 * Response type for back navigation
 */
export type BackResponse = BackSuccessResponse | BackErrorResponse;

/**
 * Method map for PlatformModule
 */
export type PlatformModuleMethods = {
  back: { params: never; response: BackResponse };
};

declare global {
  interface Window {
    /**
     * Wrapped Platform Module interface for invoking native platform operations
     */
    WrappedPlatformModule: {
      /**
       * Invokes a native platform module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<PlatformModuleMethods>;
    };
  }
}
