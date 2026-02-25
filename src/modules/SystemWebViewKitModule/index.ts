/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './type';

export class SystemWebViewKitModule extends ModuleBase {
  constructor() {
    super('SystemWebViewKitModule');
  }

  /**
   * Redirect to system webview with specified URL
   * @param payload - URL to redirect to
   * @returns Promise that resolves when redirect is initiated
   */
  redirectToSystemWebView(
    payload: RedirectToSystemWebViewRequest
  ): Promise<RedirectToSystemWebViewResponse> {
    return window.WrappedSystemWebViewKitModule.invoke('redirectToSystemWebView', payload);
  }
}

export type { RedirectToSystemWebViewRequest, RedirectToSystemWebViewResponse } from './type';
