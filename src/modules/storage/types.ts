/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

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
