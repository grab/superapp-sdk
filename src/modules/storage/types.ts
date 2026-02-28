/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, NoResultResponse, ErrorResponse } from '../../core';

/**
 * Common storage key-value pair request
 */
export type StorageKeyRequest = {
  key: string;
};

/**
 * Storage set request with boolean value
 */
export type SetBooleanRequest = {
  key: string;
  value: boolean;
};

/**
 * Storage set request with integer value
 */
export type SetIntRequest = {
  key: string;
  value: number;
};

/**
 * Storage set request with string value
 */
export type SetStringRequest = {
  key: string;
  value: string;
};

/**
 * Storage set request with double value
 */
export type SetDoubleRequest = {
  key: string;
  value: number;
};

/**
 * Success response when storage value is set successfully
 */
export type SetSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response when storage set fails
 */
export type SetErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid key or value
   * - `500`: Internal error during storage operation
   */
  status_code: 400 | 500;
};

/**
 * Response types for storage set operations
 */
export type SetResponse = SetSuccessResponse | SetErrorResponse;

/**
 * Success response when boolean value is retrieved successfully
 */
export type GetBooleanSuccessResponse = SuccessResponse<boolean>;

/**
 * No result response when key is not found
 */
export type GetBooleanNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - Key not found in storage
   */
  status_code: 204;
};

/**
 * Error response when boolean retrieval fails
 */
export type GetBooleanErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid key
   * - `500`: Internal error during storage operation
   */
  status_code: 400 | 500;
};

/**
 * Response type for getBoolean
 */
export type GetBooleanResponse =
  | GetBooleanSuccessResponse
  | GetBooleanNoResultResponse
  | GetBooleanErrorResponse;

/**
 * Success response when integer value is retrieved successfully
 */
export type GetIntSuccessResponse = SuccessResponse<number>;

/**
 * No result response when key is not found
 */
export type GetIntNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - Key not found in storage
   */
  status_code: 204;
};

/**
 * Error response when integer retrieval fails
 */
export type GetIntErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid key
   * - `500`: Internal error during storage operation
   */
  status_code: 400 | 500;
};

/**
 * Response type for getInt
 */
export type GetIntResponse = GetIntSuccessResponse | GetIntNoResultResponse | GetIntErrorResponse;

/**
 * Success response when string value is retrieved successfully
 */
export type GetStringSuccessResponse = SuccessResponse<string>;

/**
 * No result response when key is not found
 */
export type GetStringNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - Key not found in storage
   */
  status_code: 204;
};

/**
 * Error response when string retrieval fails
 */
export type GetStringErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid key
   * - `500`: Internal error during storage operation
   */
  status_code: 400 | 500;
};

/**
 * Response type for getString
 */
export type GetStringResponse =
  | GetStringSuccessResponse
  | GetStringNoResultResponse
  | GetStringErrorResponse;

/**
 * Success response when double value is retrieved successfully
 */
export type GetDoubleSuccessResponse = SuccessResponse<number>;

/**
 * No result response when key is not found
 */
export type GetDoubleNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - Key not found in storage
   */
  status_code: 204;
};

/**
 * Error response when double retrieval fails
 */
export type GetDoubleErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid key
   * - `500`: Internal error during storage operation
   */
  status_code: 400 | 500;
};

/**
 * Response type for getDouble
 */
export type GetDoubleResponse =
  | GetDoubleSuccessResponse
  | GetDoubleNoResultResponse
  | GetDoubleErrorResponse;

/**
 * Success response when storage value is removed successfully
 */
export type RemoveSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response when storage remove fails
 */
export type RemoveErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid key
   * - `500`: Internal error during storage operation
   */
  status_code: 400 | 500;
};

/**
 * Response type for remove
 */
export type RemoveResponse = RemoveSuccessResponse | RemoveErrorResponse;

/**
 * Success response when all storage values are removed successfully
 */
export type RemoveAllSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response when storage removeAll fails
 */
export type RemoveAllErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `500`: Internal error during storage operation
   */
  status_code: 500;
};

/**
 * Response type for removeAll
 */
export type RemoveAllResponse = RemoveAllSuccessResponse | RemoveAllErrorResponse;

/**
 * Alias for set response (backward compatibility)
 */
export type Set = SetResponse;

/**
 * Concrete interface for the native Storage module bridge.
 */
export interface WrappedStorageModule {
  invoke(method: 'setBoolean', params: SetBooleanRequest): Promise<SetResponse>;
  invoke(method: 'getBoolean', params: StorageKeyRequest): Promise<GetBooleanResponse>;
  invoke(method: 'setInt', params: SetIntRequest): Promise<SetResponse>;
  invoke(method: 'getInt', params: StorageKeyRequest): Promise<GetIntResponse>;
  invoke(method: 'setString', params: SetStringRequest): Promise<SetResponse>;
  invoke(method: 'getString', params: StorageKeyRequest): Promise<GetStringResponse>;
  invoke(method: 'setDouble', params: SetDoubleRequest): Promise<SetResponse>;
  invoke(method: 'getDouble', params: StorageKeyRequest): Promise<GetDoubleResponse>;
  invoke(method: 'remove', params: StorageKeyRequest): Promise<RemoveResponse>;
  invoke(method: 'removeAll'): Promise<RemoveAllResponse>;
}

declare global {
  interface Window {
    WrappedStorageModule: WrappedStorageModule;
  }
}
