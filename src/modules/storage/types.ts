/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  GetBooleanRequestSchema,
  GetBooleanResponseSchema,
  GetBooleanResultSchema,
  GetDoubleRequestSchema,
  GetDoubleResponseSchema,
  GetDoubleResultSchema,
  GetIntRequestSchema,
  GetIntResponseSchema,
  GetIntResultSchema,
  GetStringRequestSchema,
  GetStringResponseSchema,
  GetStringResultSchema,
  RawGetBooleanResponseSchema,
  RawGetDoubleResponseSchema,
  RawGetIntResponseSchema,
  RawGetStringResponseSchema,
  RemoveAllResponseSchema,
  RemoveResponseSchema,
  SetBooleanResponseSchema,
  SetDoubleResponseSchema,
  SetIntResponseSchema,
  SetStringResponseSchema,
} from './schemas';

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
export type SetBooleanResponse = InferOutput<typeof SetBooleanResponseSchema>;

/**
 * Request parameters for getting a boolean value from storage.
 *
 * @example
 * ```typescript
 * { key: 'isDarkMode' }
 * ```
 *
 * @public
 */
export type GetBooleanRequest = InferOutput<typeof GetBooleanRequestSchema>;

/**
 * Result object containing the boolean value when present on a `200` response.
 *
 * @remarks
 * When the key has no stored value, the response status is `204` instead.
 *
 * @example
 * ```typescript
 * true
 * ```
 *
 * @public
 */
export type GetBooleanResult = InferOutput<typeof GetBooleanResultSchema>;

/**
 * Internal type for the raw bridge response from getBoolean before normalization.
 *
 * @internal
 */
export type RawGetBooleanResponse = InferOutput<typeof RawGetBooleanResponseSchema>;

/**
 * Response when getting a boolean value.
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
export type GetBooleanResponse = InferOutput<typeof GetBooleanResponseSchema>;

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
export type SetIntResponse = InferOutput<typeof SetIntResponseSchema>;

/**
 * Request parameters for getting an integer value from storage.
 *
 * @example
 * ```typescript
 * { key: 'userCount' }
 * ```
 *
 * @public
 */
export type GetIntRequest = InferOutput<typeof GetIntRequestSchema>;

/**
 * Result object containing the integer value when present on a `200` response.
 *
 * @remarks
 * When the key has no stored value, the response status is `204` instead.
 *
 * @example
 * ```typescript
 * 42
 * ```
 *
 * @public
 */
export type GetIntResult = InferOutput<typeof GetIntResultSchema>;

/**
 * Internal type for the raw bridge response from getInt before normalization.
 *
 * @internal
 */
export type RawGetIntResponse = InferOutput<typeof RawGetIntResponseSchema>;

/**
 * Response when getting an integer value.
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
export type GetIntResponse = InferOutput<typeof GetIntResponseSchema>;

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
export type SetStringResponse = InferOutput<typeof SetStringResponseSchema>;

/**
 * Request parameters for getting a string value from storage.
 *
 * @example
 * ```typescript
 * { key: 'username' }
 * ```
 *
 * @public
 */
export type GetStringRequest = InferOutput<typeof GetStringRequestSchema>;

/**
 * Result object containing the string value when present on a `200` response.
 *
 * @remarks
 * When the key has no stored value, the response status is `204` instead.
 *
 * @example
 * ```typescript
 * 'john_doe'
 * ```
 *
 * @public
 */
export type GetStringResult = InferOutput<typeof GetStringResultSchema>;

/**
 * Internal type for the raw bridge response from getString before normalization.
 *
 * @internal
 */
export type RawGetStringResponse = InferOutput<typeof RawGetStringResponseSchema>;

/**
 * Response when getting a string value.
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
export type GetStringResponse = InferOutput<typeof GetStringResponseSchema>;

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
export type SetDoubleResponse = InferOutput<typeof SetDoubleResponseSchema>;

/**
 * Request parameters for getting a double value from storage.
 *
 * @example
 * ```typescript
 * { key: 'price' }
 * ```
 *
 * @public
 */
export type GetDoubleRequest = InferOutput<typeof GetDoubleRequestSchema>;

/**
 * Result object containing the double value when present on a `200` response.
 *
 * @remarks
 * When the key has no stored value, the response status is `204` instead.
 *
 * @example
 * ```typescript
 * 19.99
 * ```
 *
 * @public
 */
export type GetDoubleResult = InferOutput<typeof GetDoubleResultSchema>;

/**
 * Internal type for the raw bridge response from getDouble before normalization.
 *
 * @internal
 */
export type RawGetDoubleResponse = InferOutput<typeof RawGetDoubleResponseSchema>;

/**
 * Response when getting a double value.
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
export type GetDoubleResponse = InferOutput<typeof GetDoubleResponseSchema>;

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
export type RemoveResponse = InferOutput<typeof RemoveResponseSchema>;

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
 * @remarks
 * This response can have the following status codes:
 * - `204`: All values removed successfully.
 * - `424`: Failed Dependency - storage operation failed due to underlying storage error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type RemoveAllResponse = InferOutput<typeof RemoveAllResponseSchema>;
