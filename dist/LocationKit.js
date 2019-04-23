/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

class LocationModule {
    constructor() {
        bridgeSDK.wrapModule(window, 'LocationModule')
    }

    getCoordinate() {
        return window.WrappedLocationModule.invoke('getCoordinate');
    }

}

export default LocationModule;