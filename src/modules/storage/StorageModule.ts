/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  SetBooleanResponse,
  GetBooleanResponse,
  SetIntResponse,
  GetIntResponse,
  SetStringResponse,
  GetStringResponse,
  SetDoubleResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from './types';

/**
 * JSBridge module for persisting key-value data to native storage.
 *
 * @group Modules
 *
 * @remarks
 * Stores data in the native app's persistent storage, allowing data to survive webview restarts.
 * This code must run on the Grab SuperApp's webview to function correctly.
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

  /**
   * Stores a boolean value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The boolean value to store.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `204`: Value stored successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a boolean value
   * try {
   *   const response = await storageModule.setBoolean('isDarkMode', true);
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not store value:', response.error);
   *   } else if (isResponseNoContent(response)) {
   *     console.log('Value stored successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  setBoolean(key: string, value: boolean): Promise<SetBooleanResponse> {
    return this.wrappedModule.invoke('setBoolean', {
      key,
      value,
    });
  }

  /**
   * Retrieves a boolean value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Value retrieved successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a boolean value
   * try {
   *   const response = await storageModule.getBoolean('isDarkMode');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not retrieve value:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Stored value:', response.result);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getBoolean(key: string): Promise<GetBooleanResponse> {
    return this.wrappedModule.invoke('getBoolean', { key });
  }

  /**
   * Stores an integer value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The integer value to store.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `204`: Value stored successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set an integer value
   * try {
   *   const response = await storageModule.setInt('userCount', 42);
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not store value:', response.error);
   *   } else if (isResponseNoContent(response)) {
   *     console.log('Value stored successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  setInt(key: string, value: number): Promise<SetIntResponse> {
    return this.wrappedModule.invoke('setInt', { key, value });
  }

  /**
   * Retrieves an integer value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Value retrieved successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get an integer value
   * try {
   *   const response = await storageModule.getInt('userCount');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not retrieve value:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Stored value:', response.result);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getInt(key: string): Promise<GetIntResponse> {
    return this.wrappedModule.invoke('getInt', { key });
  }

  /**
   * Stores a string value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The string value to store.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `204`: Value stored successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a string value
   * try {
   *   const response = await storageModule.setString('username', 'john_doe');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not store value:', response.error);
   *   } else if (isResponseNoContent(response)) {
   *     console.log('Value stored successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  setString(key: string, value: string): Promise<SetStringResponse> {
    return this.wrappedModule.invoke('setString', {
      key,
      value,
    });
  }

  /**
   * Retrieves a string value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Value retrieved successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a string value
   * try {
   *   const response = await storageModule.getString('username');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not retrieve value:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Stored value:', response.result);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getString(key: string): Promise<GetStringResponse> {
    return this.wrappedModule.invoke('getString', { key });
  }

  /**
   * Stores a double (floating point) value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The double value to store.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `204`: Value stored successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a double value
   * try {
   *   const response = await storageModule.setDouble('price', 19.99);
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not store value:', response.error);
   *   } else if (isResponseNoContent(response)) {
   *     console.log('Value stored successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  setDouble(key: string, value: number): Promise<SetDoubleResponse> {
    return this.wrappedModule.invoke('setDouble', {
      key,
      value,
    });
  }

  /**
   * Retrieves a double (floating point) value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Value retrieved successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a double value
   * try {
   *   const response = await storageModule.getDouble('price');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not retrieve value:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Stored value:', response.result);
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  getDouble(key: string): Promise<GetDoubleResponse> {
    return this.wrappedModule.invoke('getDouble', { key });
  }

  /**
   * Removes a single value from the native storage by key.
   *
   * @param key - The key to remove from storage.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `204`: Value removed successfully
   * - `400`: Missing required parameters
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseNoContent, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseNoContent, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Remove a value
   * try {
   *   const response = await storageModule.remove('username');
   *
   *   if (isResponseError(response)) {
   *     console.log('Could not remove value:', response.error);
   *   } else if (isResponseNoContent(response)) {
   *     console.log('Value removed successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  remove(key: string): Promise<RemoveResponse> {
    return this.wrappedModule.invoke('remove', { key });
  }

  /**
   * Removes all values from the native storage.
   *
   * @returns A promise that resolves to a `204` status code when all values are removed.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { StorageModule, isResponseNoContent } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { StorageModule, isResponseNoContent } = window.SuperAppSDK;
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Remove all values
   * try {
   *   const response = await storageModule.removeAll();
   *
   *   if (isResponseNoContent(response)) {
   *     console.log('All values removed successfully');
   *   }
   * } catch (error) {
   *   console.log('Unexpected error:', error);
   * }
   * ```
   *
   * @public
   */
  removeAll(): Promise<RemoveAllResponse> {
    return this.wrappedModule.invoke('removeAll');
  }
}
