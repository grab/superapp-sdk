/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
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
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the system web view kit module
   * const systemWebViewKitModule = new SystemWebViewKitModule();
   *
   * // Open a URL in system web view
   * try {
   *   const response = await systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://www.example.com'
   *   });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Redirect initiated successfully');
   *       break;
   *     case 400:
   *       console.log('Could not redirect:', response.error);
   *       break;
   *     case 424:
   *       console.log('Dependency error:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (err) {
   *   console.log('Unexpected error:', err);
   * }
   * ```
   *
   * @public
   */
  async redirectToSystemWebView(
    request: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    return (await this.invoke(
      'redirectToSystemWebView',
      request
    )) as RedirectToSystemWebViewResponse;
  }
}
