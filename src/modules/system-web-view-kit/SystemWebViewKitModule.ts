/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './types';

/**
 * JSBridge module for opening URLs in the device's system browser.
 *
 * @group Modules
 *
 * @remarks
 * Allows MiniApps to redirect users to external content using the native system webview.
 * This code must run on the Grab SuperApp's webview to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
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
   * @returns Confirmation of whether the redirect to system web view was successful.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { SystemWebViewKitModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the system web view kit module
   * const systemWebViewKitModule = new SystemWebViewKitModule();
   *
   * // Open a URL in system web view
   * const response = await systemWebViewKitModule.redirectToSystemWebView({
   *   url: 'https://www.example.com'
   * });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Redirect initiated successfully');
   * } else if (isErrorResponse(response)) {
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
    return (await this.invoke({
      method: 'redirectToSystemWebView',
      params: request,
    })) as RedirectToSystemWebViewResponse;
  }
}
