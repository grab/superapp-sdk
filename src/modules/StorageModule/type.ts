/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

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
 * Response types for storage operations
 */
export type SetStorageResponse = WrappedResponse<undefined>;
export type GetBooleanResponse = WrappedResponse<boolean>;
export type GetIntResponse = WrappedResponse<number>;
export type GetStringResponse = WrappedResponse<string>;
export type GetDoubleResponse = WrappedResponse<number>;
export type RemoveResponse = WrappedResponse<undefined>;
export type RemoveAllResponse = WrappedResponse<undefined>;
