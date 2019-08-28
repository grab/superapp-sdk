/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bridgeSDK = require('@grabjs/mobile-kit-bridge-sdk');

class StorageModule {
    constructor() {
        bridgeSDK.wrapModule(window, 'StorageModule')
    }

    setBoolean(key, value) {
        return window.WrappedStorageModule.invoke('setBoolean', { key, value });
    }
    getBoolean(key) {
        return window.WrappedStorageModule.invoke('getBoolean', { key });
    }
    setInt(key, value) {
        return window.WrappedStorageModule.invoke('setInt', { key, value });
    }
    getInt(key) {
        return window.WrappedStorageModule.invoke('getInt', { key });
    }
    setString(key, value) {
        return window.WrappedStorageModule.invoke('setString', { key, value });
    }
    getString(key) {
        return window.WrappedStorageModule.invoke('getString', { key });
    }
    setDouble(key, value) {
        return window.WrappedStorageModule.invoke('setDouble', { key, value });
    }
    getDouble(key) {
        return window.WrappedStorageModule.invoke('getDouble', { key });
    }
    remove(key) {
        return window.WrappedStorageModule.invoke('remove', { key });
    }
    removeAll() {
        return window.WrappedStorageModule.invoke('removeAll');
    }

}

export default StorageModule;