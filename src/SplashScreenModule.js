/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import bridgeSDK from '@grabjs/mobile-kit-bridge-sdk';

export class SplashScreenModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'SplashScreenModule');
  }

  dismiss() {
    return window.WrappedSplashScreenModule.invoke('dismiss');
  }
}
