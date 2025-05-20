/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export class SystemWebViewKitModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'SystemWebViewKitModule');
  }

  redirectToSystemWebView({ parameters }) {
    const payload = JSON.stringify({
      method: 'redirectToSystemWebView',
      parameters,
    });
    return window.WrappedSystemWebViewKitModule.invoke(
      'redirectToSystemWebView',
      payload
    );
  }
}

