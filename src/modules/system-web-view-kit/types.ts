/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for redirecting to the system web view.
 *
 * @group Modules
 * @category System WebView Kit
 *
 * @example
 * ```typescript
 * {
 *   url: 'https://www.example.com'
 * }
 * ```
 *
 * @public
 */
export type RedirectToSystemWebViewRequest = {
  url: string;
};

/**
 * Result payload returned when redirecting to the system web view.
 *
 * @group Modules
 * @category System WebView Kit
 *
 * @public
 */
export type RedirectToSystemWebViewResult = string;

/**
 * Response when redirecting to the system web view.
 *
 * @group Modules
 * @category System WebView Kit
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Redirect initiated successfully.
 * - `400`: Invalid URL, domain not whitelisted, or missing callback URL.
 * - `424`: ASWebAuthenticationSession error - dependency error on iOS.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type RedirectToSystemWebViewResponse =
  | SDKOkResponse<RedirectToSystemWebViewResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
