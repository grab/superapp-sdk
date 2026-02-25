/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

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
 * Response type for system webview redirect
 */
export type RedirectToSystemWebViewResponse = WrappedResponse<undefined>;
