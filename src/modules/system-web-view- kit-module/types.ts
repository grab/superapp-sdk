/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse, Invoke } from '../../core';

/**
 * Request parameters for redirecting to system webview
 */
export type RedirectToSystemWebViewRequest = {
  /**
   * URL to redirect to
   */
  url: string;
};

/**
 * Success response when system webview redirect is initiated successfully
 */
export type RedirectToSystemWebViewSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response when system webview redirect fails
 */
export type RedirectToSystemWebViewErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid URL or request parameters
   * - `500`: Internal error during redirect
   */
  status_code: 400 | 500;
};

/**
 * Response type for system webview redirect
 */
export type RedirectToSystemWebViewResponse =
  | RedirectToSystemWebViewSuccessResponse
  | RedirectToSystemWebViewErrorResponse;

/**
 * Method map for SystemWebViewKitModule
 */
export type SystemWebViewKitModuleMethods = {
  redirectToSystemWebView: {
    params: RedirectToSystemWebViewRequest;
    response: RedirectToSystemWebViewResponse;
  };
};

declare global {
  interface Window {
    /**
     * Wrapped SystemWebViewKit Module interface for invoking native system webview kit operations
     */
    WrappedSystemWebViewKitModule: {
      /**
       * Invokes a native system webview kit module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<SystemWebViewKitModuleMethods>;
    };
  }
}
