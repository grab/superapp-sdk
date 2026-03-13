/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  GetBooleanResponse,
  GetDoubleResponse,
  GetIntResponse,
  GetStringResponse,
  RemoveAllResponse,
  RemoveResponse,
  SetBooleanResponse,
  SetDoubleResponse,
  SetIntResponse,
  SetStringResponse,
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
   * @returns Confirmation that the boolean value was stored.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a boolean value
   * const response = await storageModule.setBoolean('isDarkMode', true);
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('Value stored successfully');
   *     break;
   *   case 400:
   *     console.log('Could not store value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async setBoolean(key: string, value: boolean): Promise<SetBooleanResponse> {
    return (await this.invoke('setBoolean', {
      key,
      value,
    })) as SetBooleanResponse;
  }

  /**
   * Retrieves a boolean value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored boolean value.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a boolean value
   * const response = await storageModule.getBoolean('isDarkMode');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Stored value:', response.result.value);
   *     break;
   *   case 400:
   *     console.log('Could not retrieve value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async getBoolean(key: string): Promise<GetBooleanResponse> {
    return (await this.invoke('getBoolean', { key })) as GetBooleanResponse;
  }

  /**
   * Stores an integer value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The integer value to store.
   *
   * @returns Confirmation that the integer value was stored.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set an integer value
   * const response = await storageModule.setInt('userCount', 42);
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('Value stored successfully');
   *     break;
   *   case 400:
   *     console.log('Could not store value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async setInt(key: string, value: number): Promise<SetIntResponse> {
    return (await this.invoke('setInt', { key, value })) as SetIntResponse;
  }

  /**
   * Retrieves an integer value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored integer value.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get an integer value
   * const response = await storageModule.getInt('userCount');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Stored value:', response.result.value);
   *     break;
   *   case 400:
   *     console.log('Could not retrieve value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async getInt(key: string): Promise<GetIntResponse> {
    return (await this.invoke('getInt', { key })) as GetIntResponse;
  }

  /**
   * Stores a string value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The string value to store.
   *
   * @returns Confirmation that the string value was stored.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a string value
   * const response = await storageModule.setString('username', 'john_doe');
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('Value stored successfully');
   *     break;
   *   case 400:
   *     console.log('Could not store value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async setString(key: string, value: string): Promise<SetStringResponse> {
    return (await this.invoke('setString', {
      key,
      value,
    })) as SetStringResponse;
  }

  /**
   * Retrieves a string value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored string value.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a string value
   * const response = await storageModule.getString('username');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Stored value:', response.result.value);
   *     break;
   *   case 400:
   *     console.log('Could not retrieve value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async getString(key: string): Promise<GetStringResponse> {
    return (await this.invoke('getString', { key })) as GetStringResponse;
  }

  /**
   * Stores a double (floating point) value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The double value to store.
   *
   * @returns Confirmation that the double value was stored.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a double value
   * const response = await storageModule.setDouble('price', 19.99);
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('Value stored successfully');
   *     break;
   *   case 400:
   *     console.log('Could not store value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async setDouble(key: string, value: number): Promise<SetDoubleResponse> {
    return (await this.invoke('setDouble', {
      key,
      value,
    })) as SetDoubleResponse;
  }

  /**
   * Retrieves a double (floating point) value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored double value.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a double value
   * const response = await storageModule.getDouble('price');
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Stored value:', response.result.value);
   *     break;
   *   case 400:
   *     console.log('Could not retrieve value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async getDouble(key: string): Promise<GetDoubleResponse> {
    return (await this.invoke('getDouble', { key })) as GetDoubleResponse;
  }

  /**
   * Removes a single value from the native storage by key.
   *
   * @param key - The key to remove from storage.
   *
   * @returns Confirmation that the value was removed.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Remove a value
   * const response = await storageModule.remove('username');
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('Value removed successfully');
   *     break;
   *   case 400:
   *     console.log('Could not remove value:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async remove(key: string): Promise<RemoveResponse> {
    return (await this.invoke('remove', { key })) as RemoveResponse;
  }

  /**
   * Removes all values from the native storage.
   *
   * @returns Confirmation that all values were removed.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Remove all values
   * const response = await storageModule.removeAll();
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('All values removed successfully');
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async removeAll(): Promise<RemoveAllResponse> {
    return (await this.invoke('removeAll')) as RemoveAllResponse;
  }
}
