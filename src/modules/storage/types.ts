/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

// Boolean storage types
/**
 * Request parameters for setting a boolean value in storage.
 *
 * @public
 */
export type SetBooleanRequest = {
  /** The key to store the value under. */
  key: string;
  /** The boolean value to store. */
  value: boolean;
};

/**
 * Result object for setting a boolean value.
 * This operation returns no data on success.
 *
 * @public
 */
export type SetBooleanResult = void;

/**
 * Response when setting a boolean value.
 *
 * @public
 */
export type SetBooleanResponse = BridgeResponse<SetBooleanResult>;

/**
 * Request parameters for getting a boolean value from storage.
 *
 * @public
 */
export type GetBooleanRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the boolean value.
 *
 * @public
 */
export type GetBooleanResult = {
  /** The stored boolean value, or null if not found. */
  value: boolean | null;
};

/**
 * Response when getting a boolean value.
 *
 * @public
 */
export type GetBooleanResponse = BridgeResponse<boolean | null>;

// Integer storage types
/**
 * Request parameters for setting an integer value in storage.
 *
 * @public
 */
export type SetIntRequest = {
  /** The key to store the value under. */
  key: string;
  /** The integer value to store. */
  value: number;
};

/**
 * Result object for setting an integer value.
 * This operation returns no data on success.
 *
 * @public
 */
export type SetIntResult = void;

/**
 * Response when setting an integer value.
 *
 * @public
 */
export type SetIntResponse = BridgeResponse<SetIntResult>;

/**
 * Request parameters for getting an integer value from storage.
 *
 * @public
 */
export type GetIntRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the integer value.
 *
 * @public
 */
export type GetIntResult = {
  /** The stored integer value, or null if not found. */
  value: number | null;
};

/**
 * Response when getting an integer value.
 *
 * @public
 */
export type GetIntResponse = BridgeResponse<number | null>;

// String storage types
/**
 * Request parameters for setting a string value in storage.
 *
 * @public
 */
export type SetStringRequest = {
  /** The key to store the value under. */
  key: string;
  /** The string value to store. */
  value: string;
};

/**
 * Result object for setting a string value.
 * This operation returns no data on success.
 *
 * @public
 */
export type SetStringResult = void;

/**
 * Response when setting a string value.
 *
 * @public
 */
export type SetStringResponse = BridgeResponse<SetStringResult>;

/**
 * Request parameters for getting a string value from storage.
 *
 * @public
 */
export type GetStringRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the string value.
 *
 * @public
 */
export type GetStringResult = {
  /** The stored string value, or null if not found. */
  value: string | null;
};

/**
 * Response when getting a string value.
 *
 * @public
 */
export type GetStringResponse = BridgeResponse<string | null>;

// Double storage types
/**
 * Request parameters for setting a double value in storage.
 *
 * @public
 */
export type SetDoubleRequest = {
  /** The key to store the value under. */
  key: string;
  /** The double value to store. */
  value: number;
};

/**
 * Result object for setting a double value.
 * This operation returns no data on success.
 *
 * @public
 */
export type SetDoubleResult = void;

/**
 * Response when setting a double value.
 *
 * @public
 */
export type SetDoubleResponse = BridgeResponse<SetDoubleResult>;

/**
 * Request parameters for getting a double value from storage.
 *
 * @public
 */
export type GetDoubleRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the double value.
 *
 * @public
 */
export type GetDoubleResult = {
  /** The stored double value, or null if not found. */
  value: number | null;
};

/**
 * Response when getting a double value.
 *
 * @public
 */
export type GetDoubleResponse = BridgeResponse<number | null>;

// Remove types
/**
 * Request parameters for removing a value from storage.
 *
 * @public
 */
export type RemoveRequest = {
  /** The key to remove from storage. */
  key: string;
};

/**
 * Result object for removing a value.
 * This operation returns no data on success.
 *
 * @public
 */
export type RemoveResult = void;

/**
 * Response when removing a value.
 *
 * @public
 */
export type RemoveResponse = BridgeResponse<RemoveResult>;

/**
 * Request parameters for removing all values from storage.
 * This method accepts no parameters.
 *
 * @public
 */
export type RemoveAllRequest = Record<string, never>;

/**
 * Result object for removing all values.
 * This operation returns no data on success.
 *
 * @public
 */
export type RemoveAllResult = void;

/**
 * Response when removing all values.
 *
 * @public
 */
export type RemoveAllResponse = BridgeResponse<RemoveAllResult>;
