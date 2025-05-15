/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export class SystemWebViewKitModule {
  constructor() {
    // creates window.WrappedSystemWebViewKitModule
    bridgeSDK.wrapModule(window, 'SystemWebViewKitModule');
  }

  /**
   * Open the given URL in a system webview.
   * 
   * @param {{ parameters: { url: string } }} opts
   * @returns {Promise<void>}
   */
  redirectToSystemWebView({ parameters }) {
    return window.WrappedSystemWebViewKitModule.invoke(
      'redirectToSystemWebView',
      { parameters }
    );
  }
}

