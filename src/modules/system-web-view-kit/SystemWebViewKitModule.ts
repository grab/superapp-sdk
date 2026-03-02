/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import type { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './types';

/**
 * Provides functionality to open a URL in a system webview.
 *
 * @remarks
 * The SystemWebViewKitModule enables miniapps to open external URLs in a native system webview,
 * which is separate from the Grab app's webview. This is useful for displaying external content
 * or web pages that need full browser capabilities.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';
 *
 * const systemWebViewKitModule = new SystemWebViewKitModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const systemWebViewKitModule = new SuperAppSDK.SystemWebViewKitModule();
 * </script>
 * ```
 */
export class SystemWebViewKitModule extends BaseModule {
  constructor() {
    super('SystemWebViewKitModule');
  }

  /**
   * Redirect to a system webview with the specified URL.
   *
   * @remarks
   * This method opens the specified URL in a native system webview, which is separate from
   * the Grab app's webview. This is useful for displaying external content or web pages
   * that need full browser capabilities.
   *
   * @param payload - Request parameters for redirecting to system webview.
   *
   * @returns Promise that resolves to {@link RedirectToSystemWebViewResponse} when redirect is initiated.
   *
   * @example
   * Open an external website:
   * ```typescript
   * try {
   *   await systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://www.example.com'
   *   });
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Open terms and conditions:
   * ```typescript
   * try {
   *   await systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://www.grab.com/terms'
   *   });
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://help.grab.com'
   *   });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('System webview opened successfully');
   *       break;
   *     case 400:
   *       console.error('Invalid URL:', response.error);
   *       break;
   *     case 500:
   *       console.error('Redirect error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   */
  redirectToSystemWebView(
    payload: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    return window.WrappedSystemWebViewKitModule.invoke('redirectToSystemWebView', payload);
  }
}
