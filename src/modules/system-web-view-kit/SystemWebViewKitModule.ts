/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import {
  RedirectToSystemWebViewRequestSchema,
  RedirectToSystemWebViewResponseSchema,
} from './schemas';
import { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './types';

/**
 * SDK module for opening URLs in the device's system browser via `JSBridge`.
 *
 * @group Modules
 * @category System WebView Kit
 * @skillReference Container UI & Navigation
 *
 * @remarks
 * Allows MiniApps to redirect users to external content using the native system browser.
 * This code must run on the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';
 * const webViewKit = new SystemWebViewKitModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const webViewKit = new SuperAppSDK.SystemWebViewKitModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class SystemWebViewKitModule extends BaseModule {
  constructor() {
    super('SystemWebViewKitModule');
  }

  /**
   * Opens a URL in the device's system web browser or web view.
   *
   * @param request - The URL to open in the system web view.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Redirect initiated successfully.
   * - `400` (Bad Request): Invalid request parameters.
   * - `424` (Failed Dependency): Dependency error occurred while processing the request.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
   * ```typescript
   * import { SystemWebViewKitModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the system web view kit module
   * const webViewKit = new SystemWebViewKitModule();
   *
   * // Open a URL in system web view
   * const response = await webViewKit.redirectToSystemWebView({
   *   url: 'https://www.example.com'
   * });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Redirect initiated successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async redirectToSystemWebView(
    request: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    const requestError = this.validate(RedirectToSystemWebViewRequestSchema, request);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'redirectToSystemWebView',
      params: request,
    })) as RedirectToSystemWebViewResponse;

    const responseError = this.validate(RedirectToSystemWebViewResponseSchema, response);
    if (responseError)
      this.logger.warn('redirectToSystemWebView', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
