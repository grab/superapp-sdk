/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

export class ContainerModule {
  constructor() {
    bridgeSDK.wrapModule(window, 'ContainerModule');
  }

  setHeaderBackgroundColor(backgroundColor) {
    return window.WrappedStorageModule.invoke('setHeaderBackgroundColor', { backgroundColor });
  }

  setHeaderTitle(title) {
    return window.WrappedStorageModule.invoke('setHeaderTitle', { title });
  }

  setShareUrl(url) {
    return window.WrappedStorageModule.invoke('setShareUrl', { url });
  }
}
