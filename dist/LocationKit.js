/**
 * This class is automatically generated. DO NOT MODIFY.
 * Want to report issues/suggestions?
 * Please contact Mobile Platform at https://grab.slack.com/messages/CDN788BLY
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