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
 * @example
 * ```typescript
 * {
 *   url: 'https://www.example.com'
 * }
 * ```
 *
 * @group Modules
 * @category System Web View Kit
 *
 * @public
 */
export interface RedirectToSystemWebViewRequest {
  /** Absolute URL to open in the system web view. */
  url: string;
}

/**
 * Result returned when redirecting to the system web view is successful.
 *
 * @group Modules
 * @category System Web View Kit
 *
 * @public
 */
export type RedirectToSystemWebViewResult = string;

/**
 * Response returned by {@link SystemWebViewKitModule.redirectToSystemWebView}.
 *
 * @group Modules
 * @category System Web View Kit
 *
 * @public
 */
export type RedirectToSystemWebViewResponse =
  | SDKOkResponse<RedirectToSystemWebViewResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
