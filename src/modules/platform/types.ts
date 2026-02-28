/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResponse, SuccessResponse } from '../../core';

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
 * Concrete interface for the native Platform module bridge.
 */
export interface WrappedPlatformModule {
  invoke(method: 'back'): Promise<BackResponse>;
}

declare global {
  interface Window {
    WrappedPlatformModule: WrappedPlatformModule;
  }
}
