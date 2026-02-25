/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import {
  SetResponse,
  GetBooleanResponse,
  GetIntResponse,
  GetStringResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from './type';

/**
 * Provides persistence storage APIs, which helps the webview have access to persistence information for multiple sessions.
 *
 * **Important:** Once the user logs out, all saved data will be removed.
 *
 * @example
 * ```javascript
 * import { StorageModule } from '@grabjs/superapp-sdk';
 *
 * // Ideally, initialize this only once and reuse across app.
 * const storageModule = new StorageModule();
 * ```
 */
class StorageModule extends ModuleBase {
  constructor() {
    super('StorageModule');
  }

  /**
   * Store a boolean value in local storage with a key.
   *
   * @remarks
   * **Important:** Once the user logs out, all saved data will be removed.
   *
   * @param key - String name of the key to store the value under.
   * @param value - Boolean value to store.
   *
   * @returns Promise that resolves to {@link SetResponse} when value is stored.
   *
   * @example
   * ```javascript
   * storageModule.setBoolean('isEnabled', true)
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Boolean value stored successfully");
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  setBoolean(key: string, value: boolean): Promise<SetResponse> {
    return window.WrappedStorageModule.invoke('setBoolean', { key, value });
  }

  /**
   * Retrieve a boolean value from local storage by key.
   *
   * @param key - String name of the key to retrieve.
   *
   * @returns Promise that resolves to {@link GetBooleanResponse} with the stored boolean value.
   *
   * @example
   * ```javascript
   * storageModule.getBoolean('isEnabled')
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200 && result !== undefined) {
   *       console.log("Stored value:", result);
   *       if (result) {
   *         enableFeature();
   *       }
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  getBoolean(key: string): Promise<GetBooleanResponse> {
    return window.WrappedStorageModule.invoke('getBoolean', { key });
  }

  /**
   * Store an integer value in local storage with a key.
   *
   * @remarks
   * **Important:** Once the user logs out, all saved data will be removed.
   *
   * @param key - String name of the key to store the value under.
   * @param value - Integer value to store.
   *
   * @returns Promise that resolves to {@link SetResponse} when value is stored.
   *
   * @example
   * ```javascript
   * storageModule.setInt('count', 42)
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Integer value stored successfully");
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  setInt(key: string, value: number): Promise<SetResponse> {
    return window.WrappedStorageModule.invoke('setInt', { key, value });
  }

  /**
   * Retrieve an integer value from local storage by key.
   *
   * @param key - String name of the key to retrieve.
   *
   * @returns Promise that resolves to {@link GetIntResponse} with the stored integer value.
   *
   * @example
   * ```javascript
   * storageModule.getInt('count')
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200 && result !== undefined) {
   *       console.log("Stored count:", result);
   *       updateCounter(result);
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  getInt(key: string): Promise<GetIntResponse> {
    return window.WrappedStorageModule.invoke('getInt', { key });
  }

  /**
   * Store a string value in local storage with a key.
   *
   * @remarks
   * **Important:** Once the user logs out, all saved data will be removed.
   *
   * @param key - String name of the key to store the value under.
   * @param value - String value to store.
   *
   * @returns Promise that resolves to {@link SetResponse} when value is stored.
   *
   * @example
   * ```javascript
   * storageModule.setString('username', 'john_doe')
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("String value stored successfully");
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  setString(key: string, value: string): Promise<SetResponse> {
    return window.WrappedStorageModule.invoke('setString', { key, value });
  }

  /**
   * Retrieve a string value from local storage by key.
   *
   * @param key - String name of the key to retrieve.
   *
   * @returns Promise that resolves to {@link GetStringResponse} with the stored string value.
   *
   * @example
   * ```javascript
   * storageModule.getString('username')
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200 && result) {
   *       console.log("Stored username:", result);
   *       displayUsername(result);
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  getString(key: string): Promise<GetStringResponse> {
    return window.WrappedStorageModule.invoke('getString', { key });
  }

  /**
   * Store a double value in local storage with a key.
   *
   * @remarks
   * **Important:** Once the user logs out, all saved data will be removed.
   *
   * @param key - String name of the key to store the value under.
   * @param value - Double value to store.
   *
   * @returns Promise that resolves to {@link SetResponse} when value is stored.
   *
   * @example
   * ```javascript
   * storageModule.setDouble('price', 19.99)
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Double value stored successfully");
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  setDouble(key: string, value: number): Promise<SetResponse> {
    return window.WrappedStorageModule.invoke('setDouble', { key, value });
  }

  /**
   * Retrieve a double value from local storage by key.
   *
   * @param key - String name of the key to retrieve.
   *
   * @returns Promise that resolves to {@link GetDoubleResponse} with the stored double value.
   *
   * @example
   * ```javascript
   * storageModule.getDouble('price')
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200 && result !== undefined) {
   *       console.log("Stored price:", result);
   *       displayPrice(result);
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  getDouble(key: string): Promise<GetDoubleResponse> {
    return window.WrappedStorageModule.invoke('getDouble', { key });
  }

  /**
   * Remove a value from local storage by key.
   *
   * @param key - String name of the key to remove.
   *
   * @returns Promise that resolves to {@link RemoveResponse} when value is removed.
   *
   * @example
   * ```javascript
   * storageModule.remove('username')
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("Value removed successfully");
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   * ```
   */
  remove(key: string): Promise<RemoveResponse> {
    return window.WrappedStorageModule.invoke('remove', { key });
  }

  /**
   * Remove all values from local storage.
   *
   * @remarks
   * **Warning:** This will clear all data stored by your application.
   * Use with caution, typically during logout or app reset.
   *
   * @returns Promise that resolves to {@link RemoveAllResponse} when all values are removed.
   *
   * @example
   * ```javascript
   * storageModule.removeAll()
   *   .then(({ result, error, status_code }) => {
   *     if (status_code === 200) {
   *       console.log("All values cleared successfully");
   *     } else if (error) {
   *       console.error("Storage error:", error);
   *     }
   *   });
   *
   * // Example: Clear storage on logout
   * logoutButton.addEventListener('click', async () => {
   *   await storageModule.removeAll();
   *   window.location.href = '/login';
   * });
   * ```
   */
  removeAll(): Promise<RemoveAllResponse> {
    return window.WrappedStorageModule.invoke('removeAll');
  }
}

export default StorageModule;

export type {
  // SetXXX
  SetResponse,

  // GetBoolean
  GetBooleanResponse,

  // GetInt
  GetIntResponse,

  // GetString
  GetStringResponse,

  // GetDouble
  GetDoubleResponse,

  // Remove
  RemoveResponse,

  // RemoveAll
  RemoveAllResponse,
} from './type';
