/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

export class ScopeModule {
    constructor() {
        bridgeSDK.wrapModule(window, 'ScopeModule')
    }

    hasAccessTo(module, method) {
        return window.WrappedScopeModule.invoke('hasAccessTo', { module, method });
    }
    reloadScopes() {
        return window.WrappedScopeModule.invoke('reloadScopes');
    }

}