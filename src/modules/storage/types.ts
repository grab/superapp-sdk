/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for storing a boolean value in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetBooleanRequest = {
  /** Storage key used for read/write operations. */
  key: string;
  /** Value associated with the storage key. */
  value: boolean;
};

/**
 * Response when setting a boolean value.
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
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetBooleanRequest = {
  /** Storage key used for read/write operations. */
  key: string;
};

/**
 * The boolean value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
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
 * Request parameters for storing an integer value in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetIntRequest = {
  /** Storage key used for read/write operations. */
  key: string;
  /** Value associated with the storage key. */
  value: number;
};

/**
 * Response when setting an integer value.
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
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetIntRequest = {
  /** Storage key used for read/write operations. */
  key: string;
};

/**
 * The integer value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
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
 * Request parameters for storing a string value in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetStringRequest = {
  /** Storage key used for read/write operations. */
  key: string;
  /** Value associated with the storage key. */
  value: string;
};

/**
 * Response when setting a string value.
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
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetStringRequest = {
  /** Storage key used for read/write operations. */
  key: string;
};

/**
 * The string value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
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
 * Request parameters for storing a double value in storage.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type SetDoubleRequest = {
  /** Storage key used for read/write operations. */
  key: string;
  /** Value associated with the storage key. */
  value: number;
};

/**
 * Response when setting a double value.
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
 * @group Modules
 * @category Storage
 *
 * @public
 */
export type GetDoubleRequest = {
  /** Storage key used for read/write operations. */
  key: string;
};

/**
 * The floating-point value returned when a key exists in storage.
 *
 * @group Modules
 * @category Storage
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
 * @public
 */
export type RemoveResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when removing all values.
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
