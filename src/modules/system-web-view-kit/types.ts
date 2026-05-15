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
 * @public
 */
export type RedirectToSystemWebViewRequest = {
  /** URL to open or process (for example, `"https://www.example.com"`). */
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
 * @public
 */
export type RedirectToSystemWebViewResponse =
  | SDKOkResponse<RedirectToSystemWebViewResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
