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
   * @param payload - Request parameters
   * @param payload.url - The URL to open in the system webview
   * @returns Promise that resolves when redirect is initiated
   *
   * @example
   * ```javascript
   * // Open the system webview
   * systemWebViewKitModule.redirectToSystemWebView({ url: 'http://www.example.com' })
   *   .then(({ result, error }) => {
   *     if (!!result) {
   *       // There is a valid result.
   *     } else if (!!error) {
   *       // Some error happened.
   *     }
   *   });
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
