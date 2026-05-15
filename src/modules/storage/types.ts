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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'isDarkMode', value: true }
 * ```
 *
 * @public
 */
export type SetBooleanRequest = {
  key: string;
  value: boolean;
};

/**
 * Response when setting a boolean value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Value stored successfully.
 * - `400`: Missing required parameters - key or value not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'isDarkMode' }
 * ```
 *
 * @public
 */
export type GetBooleanRequest = {
  key: string;
};

/**
 * The boolean value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * When the key has no stored value, the response `status_code` is `204` instead.
 *
 * @example
 * ```typescript
 * true
 * ```
 *
 * @public
 */
export type GetBooleanResult = boolean;

/**
 * Internal type for the raw `JSBridge` response from getBoolean before normalization.
 *
 * @internal
 */
export type RawGetBooleanResponse =
  | {
      status_code: 200;
      result?: boolean | null | undefined;
    }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response when getting a boolean value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the boolean value.
 * - `204`: Value not found in storage.
 * - `400`: Missing required parameters - key not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'userCount', value: 42 }
 * ```
 *
 * @public
 */
export type SetIntRequest = {
  key: string;
  value: number;
};

/**
 * Response when setting an integer value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Value stored successfully.
 * - `400`: Missing required parameters - key or value not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'userCount' }
 * ```
 *
 * @public
 */
export type GetIntRequest = {
  key: string;
};

/**
 * The integer value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * When the key has no stored value, the response `status_code` is `204` instead.
 *
 * @example
 * ```typescript
 * 42
 * ```
 *
 * @public
 */
export type GetIntResult = number;

/**
 * Internal type for the raw `JSBridge` response from getInt before normalization.
 *
 * @internal
 */
export type RawGetIntResponse =
  | {
      status_code: 200;
      result?: number | null | undefined;
    }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response when getting an integer value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the integer value.
 * - `204`: Value not found in storage.
 * - `400`: Missing required parameters - key not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'username', value: 'john_doe' }
 * ```
 *
 * @public
 */
export type SetStringRequest = {
  key: string;
  value: string;
};

/**
 * Response when setting a string value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Value stored successfully.
 * - `400`: Missing required parameters - key or value not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'username' }
 * ```
 *
 * @public
 */
export type GetStringRequest = {
  key: string;
};

/**
 * The string value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * When the key has no stored value, the response `status_code` is `204` instead.
 *
 * @example
 * ```typescript
 * 'john_doe'
 * ```
 *
 * @public
 */
export type GetStringResult = string;

/**
 * Internal type for the raw `JSBridge` response from getString before normalization.
 *
 * @internal
 */
export type RawGetStringResponse =
  | {
      status_code: 200;
      result?: string | null | undefined;
    }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response when getting a string value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the string value.
 * - `204`: Value not found in storage.
 * - `400`: Missing required parameters - key not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'price', value: 19.99 }
 * ```
 *
 * @public
 */
export type SetDoubleRequest = {
  key: string;
  value: number;
};

/**
 * Response when setting a double value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Value stored successfully.
 * - `400`: Missing required parameters - key or value not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @group Modules
 * @category Storage
 *
 * @example
 * ```typescript
 * { key: 'price' }
 * ```
 *
 * @public
 */
export type GetDoubleRequest = {
  key: string;
};

/**
 * The floating-point value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * When the key has no stored value, the response `status_code` is `204` instead.
 *
 * @example
 * ```typescript
 * 19.99
 * ```
 *
 * @public
 */
export type GetDoubleResult = number;

/**
 * Internal type for the raw `JSBridge` response from getDouble before normalization.
 *
 * @internal
 */
export type RawGetDoubleResponse =
  | {
      status_code: 200;
      result?: number | null | undefined;
    }
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>;

/**
 * Response when getting a double value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the double value.
 * - `204`: Value not found in storage.
 * - `400`: Missing required parameters - key not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Internal request parameters for removing a value by key.
 *
 * @internal
 */
export type RemoveRequest = {
  key: string;
};

/**
 * Response when removing a value.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Value removed successfully.
 * - `400`: Missing required parameters - key not provided.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Response when removing all values.
 *
 * @group Modules
 * @category Storage
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: All values removed successfully.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type RemoveAllResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
