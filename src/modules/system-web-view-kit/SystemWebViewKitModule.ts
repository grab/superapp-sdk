/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
  RedirectToSystemWebViewResult,
} from './types';

/**
 * JSBridge module for opening URLs in the device's system browser.
 *
 * @group Modules
 *
 * @remarks
 * Allows MiniApps to redirect users to external content using the native system webview.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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
   * @returns Resolves when the redirect is initiated successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Open a URL in system web view
   * ```typescript
   * const response = await systemWebViewKitModule.redirectToSystemWebView({
   *   url: 'https://www.example.com'
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://www.example.com'
   *   });
   *   switch (status_code) {
   *     case 204:
   *       console.log('Redirect initiated successfully');
   *       break;
   *     default:
   *       console.log(`Could not redirect${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (err) {
   *   console.log(`Could not redirect${err ? `: ${err}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  redirectToSystemWebView(
    request: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    return this.wrappedModule.invoke<RedirectToSystemWebViewResult>(
      'redirectToSystemWebView',
      request
    );
  }
}
