/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  SetBooleanResponse,
  SetBooleanResult,
  GetBooleanResponse,
  SetIntResponse,
  SetIntResult,
  GetIntResponse,
  SetStringResponse,
  SetStringResult,
  GetStringResponse,
  SetDoubleResponse,
  SetDoubleResult,
  GetDoubleResponse,
  RemoveResponse,
  RemoveResult,
  RemoveAllResponse,
  RemoveAllResult,
} from './types';

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

  /**
   * Stores a boolean value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The boolean value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set a boolean value
   * ```typescript
   * const response = await storageModule.setBoolean('isDarkMode', true);
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setBoolean('isDarkMode', true);
   *   switch (status_code) {
   *     case 204:
   *       console.log('Value stored successfully');
   *       break;
   *     default:
   *       console.log(`Could not store value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not store value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  setBoolean(key: string, value: boolean): Promise<SetBooleanResponse> {
    return this.wrappedModule.invoke<SetBooleanResult>('setBoolean', {
      key,
      value,
    });
  }

  /**
   * Retrieves a boolean value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns Resolves with the stored boolean value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get a boolean value
   * ```typescript
   * const response = await storageModule.getBoolean('isDarkMode');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getBoolean('isDarkMode');
   *   switch (status_code) {
   *     case 200:
   *       console.log('Stored value:', result);
   *       break;
   *     default:
   *       console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getBoolean(key: string): Promise<GetBooleanResponse> {
    return this.wrappedModule.invoke<boolean | null>('getBoolean', { key });
  }

  /**
   * Stores an integer value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The integer value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set an integer value
   * ```typescript
   * const response = await storageModule.setInt('userCount', 42);
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setInt('userCount', 42);
   *   switch (status_code) {
   *     case 204:
   *       console.log('Value stored successfully');
   *       break;
   *     default:
   *       console.log(`Could not store value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not store value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  setInt(key: string, value: number): Promise<SetIntResponse> {
    return this.wrappedModule.invoke<SetIntResult>('setInt', { key, value });
  }

  /**
   * Retrieves an integer value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns Resolves with the stored integer value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get an integer value
   * ```typescript
   * const response = await storageModule.getInt('userCount');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getInt('userCount');
   *   switch (status_code) {
   *     case 200:
   *       console.log('Stored value:', result);
   *       break;
   *     default:
   *       console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getInt(key: string): Promise<GetIntResponse> {
    return this.wrappedModule.invoke<number | null>('getInt', { key });
  }

  /**
   * Stores a string value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The string value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set a string value
   * ```typescript
   * const response = await storageModule.setString('username', 'john_doe');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setString('username', 'john_doe');
   *   switch (status_code) {
   *     case 204:
   *       console.log('Value stored successfully');
   *       break;
   *     default:
   *       console.log(`Could not store value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not store value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  setString(key: string, value: string): Promise<SetStringResponse> {
    return this.wrappedModule.invoke<SetStringResult>('setString', {
      key,
      value,
    });
  }

  /**
   * Retrieves a string value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns Resolves with the stored string value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get a string value
   * ```typescript
   * const response = await storageModule.getString('username');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getString('username');
   *   switch (status_code) {
   *     case 200:
   *       console.log('Stored value:', result);
   *       break;
   *     default:
   *       console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getString(key: string): Promise<GetStringResponse> {
    return this.wrappedModule.invoke<string | null>('getString', { key });
  }

  /**
   * Stores a double (floating point) value in the native storage.
   *
   * @param key - The key to store the value under.
   * @param value - The double value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set a double value
   * ```typescript
   * const response = await storageModule.setDouble('price', 19.99);
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setDouble('price', 19.99);
   *   switch (status_code) {
   *     case 204:
   *       console.log('Value stored successfully');
   *       break;
   *     default:
   *       console.log(`Could not store value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not store value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  setDouble(key: string, value: number): Promise<SetDoubleResponse> {
    return this.wrappedModule.invoke<SetDoubleResult>('setDouble', {
      key,
      value,
    });
  }

  /**
   * Retrieves a double (floating point) value from the native storage.
   *
   * @param key - The key to retrieve the value for.
   *
   * @returns Resolves with the stored double value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get a double value
   * ```typescript
   * const response = await storageModule.getDouble('price');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getDouble('price');
   *   switch (status_code) {
   *     case 200:
   *       console.log('Stored value:', result);
   *       break;
   *     default:
   *       console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not retrieve value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  getDouble(key: string): Promise<GetDoubleResponse> {
    return this.wrappedModule.invoke<number | null>('getDouble', { key });
  }

  /**
   * Removes a single value from the native storage by key.
   *
   * @param key - The key to remove from storage.
   *
   * @returns Resolves when the value is removed successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Remove a value
   * ```typescript
   * const response = await storageModule.remove('username');
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.remove('username');
   *   switch (status_code) {
   *     case 200:
   *       console.log('Value removed successfully');
   *       break;
   *     default:
   *       console.log(`Could not remove value${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not remove value${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  remove(key: string): Promise<RemoveResponse> {
    return this.wrappedModule.invoke<RemoveResult>('remove', { key });
  }

  /**
   * Removes all values from the native storage.
   *
   * @returns Resolves when all values are removed successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Remove all values
   * ```typescript
   * const response = await storageModule.removeAll();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.removeAll();
   *   switch (status_code) {
   *     case 200:
   *       console.log('All values removed successfully');
   *       break;
   *     default:
   *       console.log(`Could not remove values${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (error) {
   *   console.log(`Could not remove values${error ? `: ${error}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  removeAll(): Promise<RemoveAllResponse> {
    return this.wrappedModule.invoke<RemoveAllResult>('removeAll');
  }
}
