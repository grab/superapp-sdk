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
   * @param request - The URL configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Redirect initiated successfully
   * - `400`: Invalid URL, domain not whitelisted, or missing callback URL
   * - `424`: ASWebAuthenticationSession error
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { SystemWebViewKitModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { SystemWebViewKitModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the system web view kit module
   * const systemWebViewKitModule = new SystemWebViewKitModule();
   *
   * // Open a URL in system web view
   * try {
   *   const response = await systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://www.example.com'
   *   });
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not redirect:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Redirect initiated successfully');
   *   }
   * } catch (err) {
   *   console.log('Unexpected error:', err);
   * }
   * ```
   *
   * @public
   */
  redirectToSystemWebView(
    request: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    return this.wrappedModule.invoke('redirectToSystemWebView', request);
  }
}
