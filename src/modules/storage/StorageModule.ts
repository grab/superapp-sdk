/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import {
  GetBooleanRequestSchema,
  GetBooleanResponseSchema,
  GetDoubleRequestSchema,
  GetDoubleResponseSchema,
  GetIntRequestSchema,
  GetIntResponseSchema,
  GetStringRequestSchema,
  GetStringResponseSchema,
  RawGetBooleanResponseSchema,
  RawGetDoubleResponseSchema,
  RawGetIntResponseSchema,
  RawGetStringResponseSchema,
  RemoveAllResponseSchema,
  RemoveRequestSchema,
  RemoveResponseSchema,
  SetBooleanRequestSchema,
  SetBooleanResponseSchema,
  SetDoubleRequestSchema,
  SetDoubleResponseSchema,
  SetIntRequestSchema,
  SetIntResponseSchema,
  SetStringRequestSchema,
  SetStringResponseSchema,
} from './schemas';
import {
  GetBooleanResponse,
  GetDoubleResponse,
  GetIntResponse,
  GetStringResponse,
  RawGetBooleanResponse,
  RawGetDoubleResponse,
  RawGetIntResponse,
  RawGetStringResponse,
  RemoveAllResponse,
  RemoveResponse,
  SetBooleanResponse,
  SetDoubleResponse,
  SetIntResponse,
  SetStringResponse,
} from './types';

/**
 * SDK module for persisting key-value data to native storage via `JSBridge`.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * Stores data in the native app's persistent storage, allowing data to survive WebView restarts.
 * All stored data is automatically removed when the user logs out.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
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
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to store the value under.
   * @param value - The boolean value to store.
   *
   * @returns Confirmation that the boolean value was stored. See {@link SetBooleanResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Set a boolean value
   * const response = await storage.setBoolean('isDarkMode', true);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setBoolean(key: string, value: boolean): Promise<SetBooleanResponse> {
    const params = { key, value };
    const requestError = this.validate(SetBooleanRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'setBoolean',
      params,
    })) as SetBooleanResponse;

    const responseError = this.validate(SetBooleanResponseSchema, response);
    if (responseError)
      this.logger.warn('setBoolean', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Retrieves a boolean value from the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored boolean value. See {@link GetBooleanResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Get a boolean value
   * const response = await storage.getBoolean('isDarkMode');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   if (response.status_code === 200) {
   *     console.log('Stored value:', response.result);
   *   } else if (response.status_code === 204) {
   *     console.log('No value stored for this key');
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getBoolean(key: string): Promise<GetBooleanResponse> {
    const params = { key };
    const requestError = this.validate(GetBooleanRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const rawResponse = (await this.invoke({
      method: 'getBoolean',
      params,
    })) as RawGetBooleanResponse;

    const rawResponseError = this.validate(RawGetBooleanResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('getBoolean', `Unexpected raw response shape: ${rawResponseError}`);

    let response: GetBooleanResponse;
    if (rawResponse.status_code === 200) {
      const value = rawResponse.result;
      response = value == null ? { status_code: 204 } : { status_code: 200, result: value };
    } else {
      response = rawResponse;
    }

    const responseError = this.validate(GetBooleanResponseSchema, response);
    if (responseError)
      this.logger.warn('getBoolean', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Stores an integer value in the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to store the value under.
   * @param value - The integer value to store.
   *
   * @returns Confirmation that the integer value was stored. See {@link SetIntResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Set an integer value
   * const response = await storage.setInt('userCount', 42);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setInt(key: string, value: number): Promise<SetIntResponse> {
    const params = { key, value };
    const requestError = this.validate(SetIntRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'setInt',
      params,
    })) as SetIntResponse;

    const responseError = this.validate(SetIntResponseSchema, response);
    if (responseError) this.logger.warn('setInt', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Retrieves an integer value from the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored integer value. See {@link GetIntResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Get an integer value
   * const response = await storage.getInt('userCount');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   if (response.status_code === 200) {
   *     console.log('Stored value:', response.result);
   *   } else if (response.status_code === 204) {
   *     console.log('No value stored for this key');
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getInt(key: string): Promise<GetIntResponse> {
    const params = { key };
    const requestError = this.validate(GetIntRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const rawResponse = (await this.invoke({
      method: 'getInt',
      params,
    })) as RawGetIntResponse;

    const rawResponseError = this.validate(RawGetIntResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('getInt', `Unexpected raw response shape: ${rawResponseError}`);

    let response: GetIntResponse;
    if (rawResponse.status_code === 200) {
      const value = rawResponse.result;
      response = value == null ? { status_code: 204 } : { status_code: 200, result: value };
    } else {
      response = rawResponse;
    }

    const responseError = this.validate(GetIntResponseSchema, response);
    if (responseError) this.logger.warn('getInt', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Stores a string value in the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to store the value under.
   * @param value - The string value to store.
   *
   * @returns Confirmation that the string value was stored. See {@link SetStringResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Set a string value
   * const response = await storage.setString('username', 'john_doe');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setString(key: string, value: string): Promise<SetStringResponse> {
    const params = { key, value };
    const requestError = this.validate(SetStringRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'setString',
      params,
    })) as SetStringResponse;

    const responseError = this.validate(SetStringResponseSchema, response);
    if (responseError) this.logger.warn('setString', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Retrieves a string value from the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored string value. See {@link GetStringResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Get a string value
   * const response = await storage.getString('username');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   if (response.status_code === 200) {
   *     console.log('Stored value:', response.result);
   *   } else if (response.status_code === 204) {
   *     console.log('No value stored for this key');
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getString(key: string): Promise<GetStringResponse> {
    const params = { key };
    const requestError = this.validate(GetStringRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const rawResponse = (await this.invoke({
      method: 'getString',
      params,
    })) as RawGetStringResponse;

    const rawResponseError = this.validate(RawGetStringResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('getString', `Unexpected raw response shape: ${rawResponseError}`);

    let response: GetStringResponse;
    if (rawResponse.status_code === 200) {
      const value = rawResponse.result;
      response = value == null ? { status_code: 204 } : { status_code: 200, result: value };
    } else {
      response = rawResponse;
    }

    const responseError = this.validate(GetStringResponseSchema, response);
    if (responseError) this.logger.warn('getString', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Stores a double (floating point) value in the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to store the value under.
   * @param value - The double value to store.
   *
   * @returns Confirmation that the double value was stored. See {@link SetDoubleResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Set a double value
   * const response = await storage.setDouble('price', 19.99);
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value stored successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async setDouble(key: string, value: number): Promise<SetDoubleResponse> {
    const params = { key, value };
    const requestError = this.validate(SetDoubleRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'setDouble',
      params,
    })) as SetDoubleResponse;

    const responseError = this.validate(SetDoubleResponseSchema, response);
    if (responseError) this.logger.warn('setDouble', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Retrieves a double (floating point) value from the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns The stored double value. See {@link GetDoubleResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Get a double value
   * const response = await storage.getDouble('price');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   if (response.status_code === 200) {
   *     console.log('Stored value:', response.result);
   *   } else if (response.status_code === 204) {
   *     console.log('No value stored for this key');
   *   }
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async getDouble(key: string): Promise<GetDoubleResponse> {
    const params = { key };
    const requestError = this.validate(GetDoubleRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const rawResponse = (await this.invoke({
      method: 'getDouble',
      params,
    })) as RawGetDoubleResponse;

    const rawResponseError = this.validate(RawGetDoubleResponseSchema, rawResponse);
    if (rawResponseError)
      this.logger.warn('getDouble', `Unexpected raw response shape: ${rawResponseError}`);

    let response: GetDoubleResponse;
    if (rawResponse.status_code === 200) {
      const value = rawResponse.result;
      response = value == null ? { status_code: 204 } : { status_code: 200, result: value };
    } else {
      response = rawResponse;
    }

    const responseError = this.validate(GetDoubleResponseSchema, response);
    if (responseError) this.logger.warn('getDouble', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Removes a single value from the native storage by key.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @param key - The key to remove from storage.
   *
   * @returns Confirmation that the value was removed. See {@link RemoveResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Remove a value
   * const response = await storage.remove('username');
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Value removed successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async remove(key: string): Promise<RemoveResponse> {
    const params = { key };
    const requestError = this.validate(RemoveRequestSchema, params);
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'remove',
      params,
    })) as RemoveResponse;

    const responseError = this.validate(RemoveResponseSchema, response);
    if (responseError) this.logger.warn('remove', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Removes all values from the native storage.
   *
   * @requiredOAuthScope mobile.storage
   *
   * @returns Confirmation that all values were removed. See {@link RemoveAllResponse}.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { StorageModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the storage module
   * const storage = new StorageModule();
   *
   * // Remove all values
   * const response = await storage.removeAll();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('All values removed successfully');
   * } else if (isError(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async removeAll(): Promise<RemoveAllResponse> {
    const response = (await this.invoke({
      method: 'removeAll',
    })) as RemoveAllResponse;

    const responseError = this.validate(RemoveAllResponseSchema, response);
    if (responseError) this.logger.warn('removeAll', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
