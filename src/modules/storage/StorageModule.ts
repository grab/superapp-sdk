/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import type {
  SetResponse,
  GetBooleanResponse,
  GetIntResponse,
  GetStringResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from './types';

/**
 * Provides persistence storage APIs for maintaining data across multiple sessions.
 *
 * @remarks
 * **Important:** Once the user logs out, all saved data will be removed.
 *
 * The StorageModule enables miniapps to store and retrieve primitive values (boolean, integer,
 * string, double) that persist across webview sessions.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { StorageModule } from '@grabjs/superapp-sdk';
 *
 * const storageModule = new StorageModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const storageModule = new SuperAppSDK.StorageModule();
 * </script>
 * ```
 */
class StorageModule extends BaseModule {
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
   * ```typescript
   * try {
   *   await storageModule.setBoolean('isEnabled', true);
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   const response = await storageModule.getBoolean('isEnabled');
   *   if (response.status_code === 200 && response.result !== undefined) {
   *     console.log("Stored value:", response.result);
   *     if (response.result) {
   *       enableFeature();
   *     }
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   await storageModule.setInt('count', 42);
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   const response = await storageModule.getInt('count');
   *   if (response.status_code === 200 && response.result !== undefined) {
   *     console.log("Stored count:", response.result);
   *     updateCounter(response.result);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   await storageModule.setString('username', 'john_doe');
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   const response = await storageModule.getString('username');
   *   if (response.status_code === 200 && response.result) {
   *     console.log("Stored username:", response.result);
   *     displayUsername(response.result);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   await storageModule.setDouble('price', 19.99);
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   const response = await storageModule.getDouble('price');
   *   if (response.status_code === 200 && response.result !== undefined) {
   *     console.log("Stored price:", response.result);
   *     displayPrice(response.result);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   await storageModule.remove('username');
   * } catch (error) {
   *   console.error(error);
   * }
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
   * ```typescript
   * try {
   *   await storageModule.removeAll();
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Clear storage on logout
   * ```typescript
   * logoutButton.addEventListener('click', async () => {
   *   try {
   *     await storageModule.removeAll();
   *     window.location.href = '/login';
   *   } catch (error) {
   *     console.error(error);
   *   }
   * });
   * ```
   */
  removeAll(): Promise<RemoveAllResponse> {
    return window.WrappedStorageModule.invoke('removeAll');
  }
}

export default StorageModule;
