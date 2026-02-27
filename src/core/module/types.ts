/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Success response from the bridge SDK
 */
export type SuccessResponse<T> = {
  /**
   * Status code: `200` - Operation completed successfully
   */
  status_code: 200;
  /**
   * The result data from the successful operation
   */
  result: T;
  /**
   * Always undefined for success responses
   */
  error?: undefined;
};

/**
 * No result response from the bridge SDK
 */
export type NoResultResponse = {
  /**
   * Status codes:
   * - `204`: No content (user cancelled or operation returned no data)
   * - `302`: Redirect occurred
   */
  status_code: 204 | 302;
  /**
   * Always undefined for no-result responses
   */
  result?: undefined;
  /**
   * Always undefined for no-result responses
   */
  error?: undefined;
};

/**
 * Error response from the bridge SDK
 */
export type ErrorResponse = {
  /**
   * Status codes:
   * - `400`: Bad request (invalid parameters)
   * - `403`: Forbidden (permission denied)
   * - `424`: Failed dependency
   * - `500`: Internal server error
   */
  status_code: 400 | 403 | 424 | 500;
  /**
   * Always undefined for error responses
   */
  result?: undefined;
  /**
   * Error message describing what went wrong
   */
  error: string;
};

/**
 * Native response from the bridge SDK
 * Universal response format for all native modules
 */
export type Response<T> = SuccessResponse<T> | NoResultResponse | ErrorResponse;

/**
 * Helper type to create a typed invoke function
 */
export type Invoke<T> = <K extends keyof T>(
  method: K,
  ...args: T[K] extends { params: never } ? [] : [T[K] extends { params: infer P } ? P : never]
) => T[K] extends { response: infer R } ? Promise<R> : never;
