/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Request parameters for redirecting to the system web view.
 *
 * @public
 */
export type RedirectToSystemWebViewRequest = {
  /** The URL to open in the system web view. */
  url: string;
};

/**
 * Result object for redirecting to the system web view.
 * This operation returns no data on success.
 *
 * @public
 */
export type RedirectToSystemWebViewResult = void;

/**
 * Response when redirecting to the system web view.
 *
 * @public
 */
export type RedirectToSystemWebViewResponse = BridgeResponse<RedirectToSystemWebViewResult>;
