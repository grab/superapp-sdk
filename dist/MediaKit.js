/**
 * This class is automatically generated. DO NOT MODIFY.
 * Want to report issues/suggestions?
 * Please contact Mobile Platform at https://grab.slack.com/messages/CDN788BLY
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

class MediaModule {
    constructor() {
        bridgeSDK.wrapModule(window, 'MediaModule')
    }

    playDRMContent(data) {
        return window.WrappedMediaModule.invoke('playDRMContent', { data });
    }

}

export default MediaModule;