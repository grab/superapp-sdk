/**
 * This class is automatically generated. DO NOT MODIFY.
 * Want to report issues/suggestions?
 * Please contact Mobile Platform at https://grab.slack.com/messages/CDN788BLY
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

class ScopeModule {
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

export default ScopeModule;