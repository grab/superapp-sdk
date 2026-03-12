/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Redirect initiated successfully.
 * - `400`: Invalid URL, domain not whitelisted, or missing callback URL.
 * - `424`: ASWebAuthenticationSession error - dependency error on iOS.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid URL or domain not whitelisted'
 * }
 * ```
 *
 * @example
 * **Failed dependency response (424):**
 * ```typescript
 * {
 *   status_code: 424,
 *   error: 'ASWebAuthenticationSession error'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type RedirectToSystemWebViewResponse = ConstrainedBridgeResponse<
  RedirectToSystemWebViewResult,
  200 | 400 | 424 | 501
>;
