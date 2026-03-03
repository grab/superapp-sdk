/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';

/**
 * JSBridge module for persisting key-value data to native storage.
 *
 * @remarks
 * Stores data in the native app's persistent storage, allowing data to survive webview restarts.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { StorageModule } from '@grabjs/superapp-sdk';
 * const storage = new StorageModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const storage = new SuperAppSDK.StorageModule();
 * </script>
 * ```
 *
 * @public
 */
export class StorageModule extends BaseModule {
  constructor() {
    super('StorageModule');
  }

  setBoolean(key, value) {
    return window.WrappedStorageModule!.invoke('setBoolean', { key, value });
  }
  getBoolean(key) {
    return window.WrappedStorageModule!.invoke('getBoolean', { key });
  }
  setInt(key, value) {
    return window.WrappedStorageModule!.invoke('setInt', { key, value });
  }
  getInt(key) {
    return window.WrappedStorageModule!.invoke('getInt', { key });
  }
  setString(key, value) {
    return window.WrappedStorageModule!.invoke('setString', { key, value });
  }
  getString(key) {
    return window.WrappedStorageModule!.invoke('getString', { key });
  }
  setDouble(key, value) {
    return window.WrappedStorageModule!.invoke('setDouble', { key, value });
  }
  getDouble(key) {
    return window.WrappedStorageModule!.invoke('getDouble', { key });
  }
  remove(key) {
    return window.WrappedStorageModule!.invoke('remove', { key });
  }
  removeAll() {
    return window.WrappedStorageModule!.invoke('removeAll');
  }
}
