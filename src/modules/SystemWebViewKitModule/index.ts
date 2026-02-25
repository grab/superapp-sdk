/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './type';

/**
 * The SystemWebViewKitModule provides functionality to open a URL in a system webview.
 *
 * @example
 * ```javascript
 * import { SystemWebViewKitModule } from '@grabjs/superapp-sdk';
 *
 * // Initialize once and reuse
 * const systemWebViewKitModule = new SystemWebViewKitModule();
 * ```
 */
class SystemWebViewKitModule extends ModuleBase {
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
   * @param payload - Request parameters.
   *   - `url`: The URL to open in the system webview
   *
   * @returns Promise that resolves to {@link RedirectToSystemWebViewResponse} when redirect is initiated.
   *
   * @example
   * ```javascript
   * // Example 1: Open an external website
   * systemWebViewKitModule.redirectToSystemWebView({
   *   url: 'https://www.example.com'
   * })
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("System webview opened successfully");
   *     } else if (error) {
   *       console.error("Redirect error:", error);
   *     }
   *   });
   *
   * // Example 2: Open terms and conditions
   * systemWebViewKitModule.redirectToSystemWebView({
   *   url: 'https://www.grab.com/terms'
   * });
   *
   * // Example 3: Open help documentation
   * const openHelp = () => {
   *   systemWebViewKitModule.redirectToSystemWebView({
   *     url: 'https://help.grab.com'
   *   });
   * };
   * ```
   */
  redirectToSystemWebView(
    payload: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    return window.WrappedSystemWebViewKitModule.invoke('redirectToSystemWebView', payload);
  }
}

export default SystemWebViewKitModule;

export type {
  // RedirectToSystemWebView
  RedirectToSystemWebViewRequest,
  RedirectToSystemWebViewResponse,
} from './type';
