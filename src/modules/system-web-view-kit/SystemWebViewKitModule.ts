/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { _BaseModule } from '../../core';
import {
  RedirectToSystemWebViewRequestSchema,
  RedirectToSystemWebViewResponseSchema,
} from './schemas';
import { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './types';

/**
 * JSBridge module for opening URLs in the system web view.
 *
 * @group Modules
 * @category System Web View Kit
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
export class SystemWebViewKitModule extends _BaseModule {
  constructor() {
    super('SystemWebViewKitModule');
  }

  /**
   * Opens a URL in the system web view.
   *
   * @param request - System web view redirect configuration.
   * Request fields:
   * - `url`: Absolute URL to open in the system web view.
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - redirect initiated successfully. The `result` is {@link RedirectToSystemWebViewResult}.
   * - `400`: Bad request - invalid URL, domain not whitelisted, or missing callback URL.
   * - `424`: Failed dependency - ASWebAuthenticationSession error on iOS.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * **Usage**
   * ```typescript
   * import { SystemWebViewKitModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the system web view kit module
   * const webViewKit = new SystemWebViewKitModule();
   *
   * // Open a URL in the system web view
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
