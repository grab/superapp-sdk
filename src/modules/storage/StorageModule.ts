/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
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
 * @noInheritDoc
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a boolean value
   * const response = await storageModule.setBoolean('isDarkMode', true);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setBoolean(key: string, value: boolean): Promise<SetBooleanResponse> {
    return (await this.invoke({
      method: 'setBoolean',
      params: { key, value },
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a boolean value
   * const response = await storageModule.getBoolean('isDarkMode');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Stored value:', response.result.value);
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getBoolean(key: string): Promise<GetBooleanResponse> {
    return (await this.invoke({
      method: 'getBoolean',
      params: { key },
    })) as GetBooleanResponse;
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set an integer value
   * const response = await storageModule.setInt('userCount', 42);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setInt(key: string, value: number): Promise<SetIntResponse> {
    return (await this.invoke({
      method: 'setInt',
      params: { key, value },
    })) as SetIntResponse;
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get an integer value
   * const response = await storageModule.getInt('userCount');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Stored value:', response.result.value);
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getInt(key: string): Promise<GetIntResponse> {
    return (await this.invoke({
      method: 'getInt',
      params: { key },
    })) as GetIntResponse;
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a string value
   * const response = await storageModule.setString('username', 'john_doe');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setString(key: string, value: string): Promise<SetStringResponse> {
    return (await this.invoke({
      method: 'setString',
      params: { key, value },
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a string value
   * const response = await storageModule.getString('username');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Stored value:', response.result.value);
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getString(key: string): Promise<GetStringResponse> {
    return (await this.invoke({
      method: 'getString',
      params: { key },
    })) as GetStringResponse;
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Set a double value
   * const response = await storageModule.setDouble('price', 19.99);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setDouble(key: string, value: number): Promise<SetDoubleResponse> {
    return (await this.invoke({
      method: 'setDouble',
      params: { key, value },
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Get a double value
   * const response = await storageModule.getDouble('price');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Stored value:', response.result.value);
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getDouble(key: string): Promise<GetDoubleResponse> {
    return (await this.invoke({
      method: 'getDouble',
      params: { key },
    })) as GetDoubleResponse;
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
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Remove a value
   * const response = await storageModule.remove('username');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value removed successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async remove(key: string): Promise<RemoveResponse> {
    return (await this.invoke({
      method: 'remove',
      params: { key },
    })) as RemoveResponse;
  }

  /**
   * Removes all values from the native storage.
   *
   * @returns Confirmation that all values were removed.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storageModule = new StorageModule();
   *
   * // Remove all values
   * const response = await storageModule.removeAll();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('All values removed successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async removeAll(): Promise<RemoveAllResponse> {
    return (await this.invoke({ method: 'removeAll' })) as RemoveAllResponse;
  }
}
