/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse, WrappedModule } from '../../core';

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
    WrappedSystemWebViewKitModule: WrappedModule<SystemWebViewKitModuleMethods>;
  }
}
