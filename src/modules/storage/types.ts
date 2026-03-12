/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

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
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SetBooleanResponse = ConstrainedBridgeResponse<SetBooleanResult, 204 | 400 | 501>;

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
export type GetBooleanRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the boolean value.
 *
 * @example
 * **Value exists:**
 * ```typescript
 * { value: true }
 * ```
 *
 * @example
 * **Value not found:**
 * ```typescript
 * { value: null }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the boolean value or null if not found.
 * - `400`: Missing required parameters - key not provided.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - value exists:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: true }
 * }
 * ```
 *
 * @example
 * **Success response (200) - value not found:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: null }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type GetBooleanResponse = ConstrainedBridgeResponse<GetBooleanResult, 200 | 400 | 501>;

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
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SetIntResponse = ConstrainedBridgeResponse<SetIntResult, 204 | 400 | 501>;

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
export type GetIntRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the integer value.
 *
 * @example
 * **Value exists:**
 * ```typescript
 * { value: 42 }
 * ```
 *
 * @example
 * **Value not found:**
 * ```typescript
 * { value: null }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the integer value or null if not found.
 * - `400`: Missing required parameters - key not provided.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - value exists:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: 42 }
 * }
 * ```
 *
 * @example
 * **Success response (200) - value not found:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: null }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type GetIntResponse = ConstrainedBridgeResponse<GetIntResult, 200 | 400 | 501>;

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
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SetStringResponse = ConstrainedBridgeResponse<SetStringResult, 204 | 400 | 501>;

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
export type GetStringRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the string value.
 *
 * @example
 * **Value exists:**
 * ```typescript
 * { value: 'john_doe' }
 * ```
 *
 * @example
 * **Value not found:**
 * ```typescript
 * { value: null }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the string value or null if not found.
 * - `400`: Missing required parameters - key not provided.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - value exists:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: 'john_doe' }
 * }
 * ```
 *
 * @example
 * **Success response (200) - value not found:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: null }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type GetStringResponse = ConstrainedBridgeResponse<GetStringResult, 200 | 400 | 501>;

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
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type SetDoubleResponse = ConstrainedBridgeResponse<SetDoubleResult, 204 | 400 | 501>;

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
export type GetDoubleRequest = {
  /** The key to retrieve the value for. */
  key: string;
};

/**
 * Result object containing the double value.
 *
 * @example
 * **Value exists:**
 * ```typescript
 * { value: 19.99 }
 * ```
 *
 * @example
 * **Value not found:**
 * ```typescript
 * { value: null }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Value retrieved successfully. The `result` contains the double value or null if not found.
 * - `400`: Missing required parameters - key not provided.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - value exists:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: 19.99 }
 * }
 * ```
 *
 * @example
 * **Success response (200) - value not found:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { value: null }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type GetDoubleResponse = ConstrainedBridgeResponse<GetDoubleResult, 200 | 400 | 501>;

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
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type RemoveResponse = ConstrainedBridgeResponse<RemoveResult, 204 | 400 | 501>;

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
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type RemoveAllResponse = ConstrainedBridgeResponse<RemoveAllResult, 204 | 501>;
