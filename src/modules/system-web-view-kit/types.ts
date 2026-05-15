/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  RedirectToSystemWebViewRequestSchema,
  RedirectToSystemWebViewResponseSchema,
} from './schemas';

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
export type RedirectToSystemWebViewRequest = InferOutput<
  typeof RedirectToSystemWebViewRequestSchema
>;

/**
 * Result object for redirecting to the system web view.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category System WebView Kit
 *
 * @public
 */
export type RedirectToSystemWebViewResult = void;

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
export type RedirectToSystemWebViewResponse = InferOutput<
  typeof RedirectToSystemWebViewResponseSchema
>;
