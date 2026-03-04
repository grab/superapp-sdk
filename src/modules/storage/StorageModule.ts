/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  SetBooleanRequest,
  SetBooleanResponse,
  SetBooleanResult,
  GetBooleanRequest,
  GetBooleanResponse,
  SetIntRequest,
  SetIntResponse,
  SetIntResult,
  GetIntRequest,
  GetIntResponse,
  SetStringRequest,
  SetStringResponse,
  SetStringResult,
  GetStringRequest,
  GetStringResponse,
  SetDoubleRequest,
  SetDoubleResponse,
  SetDoubleResult,
  GetDoubleRequest,
  GetDoubleResponse,
  RemoveRequest,
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
   * @param request - The key and boolean value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set a boolean value
   * ```typescript
   * const response = await storageModule.setBoolean({ key: 'isDarkMode', value: true });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setBoolean({ key: 'isDarkMode', value: true });
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
  setBoolean(request: SetBooleanRequest): Promise<SetBooleanResponse> {
    return this.wrappedModule.invoke<SetBooleanResult>('setBoolean', request);
  }

  /**
   * Retrieves a boolean value from the native storage.
   *
   * @param request - The key to retrieve the value for.
   *
   * @returns Resolves with the stored boolean value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get a boolean value
   * ```typescript
   * const response = await storageModule.getBoolean({ key: 'isDarkMode' });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getBoolean({ key: 'isDarkMode' });
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
  getBoolean(request: GetBooleanRequest): Promise<GetBooleanResponse> {
    return this.wrappedModule.invoke<boolean | null>('getBoolean', request);
  }

  /**
   * Stores an integer value in the native storage.
   *
   * @param request - The key and integer value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set an integer value
   * ```typescript
   * const response = await storageModule.setInt({ key: 'userCount', value: 42 });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setInt({ key: 'userCount', value: 42 });
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
  setInt(request: SetIntRequest): Promise<SetIntResponse> {
    return this.wrappedModule.invoke<SetIntResult>('setInt', request);
  }

  /**
   * Retrieves an integer value from the native storage.
   *
   * @param request - The key to retrieve the value for.
   *
   * @returns Resolves with the stored integer value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get an integer value
   * ```typescript
   * const response = await storageModule.getInt({ key: 'userCount' });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getInt({ key: 'userCount' });
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
  getInt(request: GetIntRequest): Promise<GetIntResponse> {
    return this.wrappedModule.invoke<number | null>('getInt', request);
  }

  /**
   * Stores a string value in the native storage.
   *
   * @param request - The key and string value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set a string value
   * ```typescript
   * const response = await storageModule.setString({ key: 'username', value: 'john_doe' });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setString({ key: 'username', value: 'john_doe' });
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
  setString(request: SetStringRequest): Promise<SetStringResponse> {
    return this.wrappedModule.invoke<SetStringResult>('setString', request);
  }

  /**
   * Retrieves a string value from the native storage.
   *
   * @param request - The key to retrieve the value for.
   *
   * @returns Resolves with the stored string value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get a string value
   * ```typescript
   * const response = await storageModule.getString({ key: 'username' });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getString({ key: 'username' });
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
  getString(request: GetStringRequest): Promise<GetStringResponse> {
    return this.wrappedModule.invoke<string | null>('getString', request);
  }

  /**
   * Stores a double (floating point) value in the native storage.
   *
   * @param request - The key and double value to store.
   *
   * @returns Resolves when the value is stored successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Set a double value
   * ```typescript
   * const response = await storageModule.setDouble({ key: 'price', value: 19.99 });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.setDouble({ key: 'price', value: 19.99 });
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
  setDouble(request: SetDoubleRequest): Promise<SetDoubleResponse> {
    return this.wrappedModule.invoke<SetDoubleResult>('setDouble', request);
  }

  /**
   * Retrieves a double (floating point) value from the native storage.
   *
   * @param request - The key to retrieve the value for.
   *
   * @returns Resolves with the stored double value on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Get a double value
   * ```typescript
   * const response = await storageModule.getDouble({ key: 'price' });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await storageModule.getDouble({ key: 'price' });
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
  getDouble(request: GetDoubleRequest): Promise<GetDoubleResponse> {
    return this.wrappedModule.invoke<number | null>('getDouble', request);
  }

  /**
   * Removes a single value from the native storage by key.
   *
   * @param request - The key to remove from storage.
   *
   * @returns Resolves when the value is removed successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Remove a value
   * ```typescript
   * const response = await storageModule.remove({ key: 'username' });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await storageModule.remove({ key: 'username' });
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
  remove(request: RemoveRequest): Promise<RemoveResponse> {
    return this.wrappedModule.invoke<RemoveResult>('remove', request);
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
