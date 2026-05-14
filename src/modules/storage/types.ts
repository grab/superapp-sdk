/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Result object for setting a boolean value.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetBooleanResult = void;

/**
 * Request parameters for storing a boolean value in storage.
 *
 * @example
 * ```typescript
 * { key: 'isDarkMode', value: true }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface SetBooleanRequest {
  /** Storage key for the value. */
  key: string;
  /** Boolean value to persist. */
  value: boolean;
}

/**
 * Response returned by {@link StorageModule.setBoolean}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetBooleanResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for getting a boolean value from storage.
 *
 * @example
 * ```typescript
 * { key: 'isDarkMode' }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface GetBooleanRequest {
  /** Storage key to read. */
  key: string;
}

/**
 * The boolean value returned when a key exists in storage.
 *
 * @example
 * ```typescript
 * true
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetBooleanResult = boolean;

/**
 * Internal type for the raw SDK response from getBoolean before normalization.
 *
 * @internal
 */
export type RawGetBooleanResponse =
  | { status_code: 200; result?: boolean | null }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response returned by {@link StorageModule.getBoolean}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetBooleanResponse =
  | SDKOkResponse<GetBooleanResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for setting an integer value.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetIntResult = void;

/**
 * Request parameters for storing an integer value in storage.
 *
 * @example
 * ```typescript
 * { key: 'userCount', value: 42 }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface SetIntRequest {
  /** Storage key for the value. */
  key: string;
  /** Integer value to persist. */
  value: number;
}

/**
 * Response returned by {@link StorageModule.setInt}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetIntResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for getting an integer value from storage.
 *
 * @example
 * ```typescript
 * { key: 'userCount' }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface GetIntRequest {
  /** Storage key to read. */
  key: string;
}

/**
 * The integer value returned when a key exists in storage.
 *
 * @example
 * ```typescript
 * 42
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetIntResult = number;

/**
 * Internal type for the raw SDK response from getInt before normalization.
 *
 * @internal
 */
export type RawGetIntResponse =
  | { status_code: 200; result?: number | null }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response returned by {@link StorageModule.getInt}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetIntResponse =
  | SDKOkResponse<GetIntResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for setting a string value.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetStringResult = void;

/**
 * Request parameters for storing a string value in storage.
 *
 * @example
 * ```typescript
 * { key: 'username', value: 'john_doe' }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface SetStringRequest {
  /** Storage key for the value. */
  key: string;
  /** String value to persist. */
  value: string;
}

/**
 * Response returned by {@link StorageModule.setString}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetStringResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for getting a string value from storage.
 *
 * @example
 * ```typescript
 * { key: 'username' }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface GetStringRequest {
  /** Storage key to read. */
  key: string;
}

/**
 * The string value returned when a key exists in storage.
 *
 * @example
 * ```typescript
 * 'john_doe'
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetStringResult = string;

/**
 * Internal type for the raw SDK response from getString before normalization.
 *
 * @internal
 */
export type RawGetStringResponse =
  | { status_code: 200; result?: string | null }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response returned by {@link StorageModule.getString}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetStringResponse =
  | SDKOkResponse<GetStringResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for setting a double value.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetDoubleResult = void;

/**
 * Request parameters for storing a double value in storage.
 *
 * @example
 * ```typescript
 * { key: 'price', value: 19.99 }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface SetDoubleRequest {
  /** Storage key for the value. */
  key: string;
  /** Floating-point value to persist. */
  value: number;
}

/**
 * Response returned by {@link StorageModule.setDouble}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetDoubleResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for getting a double value from storage.
 *
 * @example
 * ```typescript
 * { key: 'price' }
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export interface GetDoubleRequest {
  /** Storage key to read. */
  key: string;
}

/**
 * The floating-point value returned when a key exists in storage.
 *
 * @example
 * ```typescript
 * 19.99
 * ```
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetDoubleResult = number;

/**
 * Internal type for the raw SDK response from getDouble before normalization.
 *
 * @internal
 */
export type RawGetDoubleResponse =
  | { status_code: 200; result?: number | null }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response returned by {@link StorageModule.getDouble}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetDoubleResponse =
  | SDKOkResponse<GetDoubleResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for removing a value.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type RemoveResult = void;

/**
 * Response returned by {@link StorageModule.remove}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type RemoveResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Result object for removing all values.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type RemoveAllResult = void;

/**
 * Response returned by {@link StorageModule.removeAll}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type RemoveAllResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
