/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse } from '../../core';

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
 * Concrete interface for the native SystemWebViewKit module bridge.
 */
export interface WrappedSystemWebViewKitModule {
  invoke(
    method: 'redirectToSystemWebView',
    params: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse>;
}

declare global {
  interface Window {
    WrappedSystemWebViewKitModule: WrappedSystemWebViewKitModule;
  }
}
