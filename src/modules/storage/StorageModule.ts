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
 * @group Modules
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
    return this.wrappedModule.invoke('setBoolean', { key, value });
  }
  getBoolean(key) {
    return this.wrappedModule.invoke('getBoolean', { key });
  }
  setInt(key, value) {
    return this.wrappedModule.invoke('setInt', { key, value });
  }
  getInt(key) {
    return this.wrappedModule.invoke('getInt', { key });
  }
  setString(key, value) {
    return this.wrappedModule.invoke('setString', { key, value });
  }
  getString(key) {
    return this.wrappedModule.invoke('getString', { key });
  }
  setDouble(key, value) {
    return this.wrappedModule.invoke('setDouble', { key, value });
  }
  getDouble(key) {
    return this.wrappedModule.invoke('getDouble', { key });
  }
  remove(key) {
    return this.wrappedModule.invoke('remove', { key });
  }
  removeAll() {
    return this.wrappedModule.invoke('removeAll');
  }
}
