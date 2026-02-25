/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import {
  SetStorageResponse,
  GetBooleanResponse,
  GetIntResponse,
  GetStringResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from './type';

export class StorageModule extends ModuleBase {
  constructor() {
    super('StorageModule');
  }

  /**
   * Store a boolean value
   * @param key - Storage key
   * @param value - Boolean value to store
   * @returns Promise that resolves when value is stored
   */
  setBoolean(key: string, value: boolean): Promise<SetStorageResponse> {
    return window.WrappedStorageModule.invoke('setBoolean', { key, value });
  }

  /**
   * Retrieve a boolean value
   * @param key - Storage key
   * @returns Promise that resolves to the stored boolean value
   */
  getBoolean(key: string): Promise<GetBooleanResponse> {
    return window.WrappedStorageModule.invoke('getBoolean', { key });
  }

  /**
   * Store an integer value
   * @param key - Storage key
   * @param value - Integer value to store
   * @returns Promise that resolves when value is stored
   */
  setInt(key: string, value: number): Promise<SetStorageResponse> {
    return window.WrappedStorageModule.invoke('setInt', { key, value });
  }

  /**
   * Retrieve an integer value
   * @param key - Storage key
   * @returns Promise that resolves to the stored integer value
   */
  getInt(key: string): Promise<GetIntResponse> {
    return window.WrappedStorageModule.invoke('getInt', { key });
  }

  /**
   * Store a string value
   * @param key - Storage key
   * @param value - String value to store
   * @returns Promise that resolves when value is stored
   */
  setString(key: string, value: string): Promise<SetStorageResponse> {
    return window.WrappedStorageModule.invoke('setString', { key, value });
  }

  /**
   * Retrieve a string value
   * @param key - Storage key
   * @returns Promise that resolves to the stored string value
   */
  getString(key: string): Promise<GetStringResponse> {
    return window.WrappedStorageModule.invoke('getString', { key });
  }

  /**
   * Store a double value
   * @param key - Storage key
   * @param value - Double value to store
   * @returns Promise that resolves when value is stored
   */
  setDouble(key: string, value: number): Promise<SetStorageResponse> {
    return window.WrappedStorageModule.invoke('setDouble', { key, value });
  }

  /**
   * Retrieve a double value
   * @param key - Storage key
   * @returns Promise that resolves to the stored double value
   */
  getDouble(key: string): Promise<GetDoubleResponse> {
    return window.WrappedStorageModule.invoke('getDouble', { key });
  }

  /**
   * Remove a value by key
   * @param key - Storage key to remove
   * @returns Promise that resolves when value is removed
   */
  remove(key: string): Promise<RemoveResponse> {
    return window.WrappedStorageModule.invoke('remove', { key });
  }

  /**
   * Remove all stored values
   * @returns Promise that resolves when all values are removed
   */
  removeAll(): Promise<RemoveAllResponse> {
    return window.WrappedStorageModule.invoke('removeAll');
  }
}

export type {
  StorageKeyRequest,
  SetBooleanRequest,
  SetIntRequest,
  SetStringRequest,
  SetDoubleRequest,
  SetStorageResponse,
  GetBooleanResponse,
  GetIntResponse,
  GetStringResponse,
  GetDoubleResponse,
  RemoveResponse,
  RemoveAllResponse,
} from './type';
