/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Success response from the bridge SDK.
 *
 * @remarks
 * Returned when a JSBridge method completes successfully.
 * The `result` field contains the JSBridge method's data.
 *
 * @public
 */
export type BridgeSuccessResponse<T> = {
  /** Status code: `200` - JSBridge method completed successfully */
  status_code: 200;
  /** The result data from the successful JSBridge method */
  result: T;
  /** Always undefined for success responses */
  error?: undefined;
};

/**
 * No result response from the JSBridge method.
 *
 * @remarks
 * Returned when a JSBridge method completes with no content (e.g., user cancelled a dialog, redirect occurred).
 * No `result` or `error` data is returned.
 *
 * @public
 */
export type BridgeNoResultResponse = {
  /**
   * Status codes:
   *
   * - `204`: No content (user cancelled or operation returned no data)
   * - `302`: Redirect occurred
   */
  status_code: 204 | 302;
  /** Always undefined for no-result JSBridge responses */
  result?: undefined;
  /** Always undefined for no-result JSBridge responses */
  error?: undefined;
};

/**
 * Error response from the JSBridge method.
 *
 * @remarks
 * Returned when a JSBridge method fails.
 * The `error` field contains a human-readable message.
 *
 * @public
 */
export type BridgeErrorResponse = {
  /**
   * Status codes:
   *
   * - `400`: Bad request (invalid parameters)
   * - `403`: Forbidden (permission denied)
   * - `424`: Failed dependency
   * - `500`: Internal server error
   */
  status_code: 400 | 403 | 424 | 500;
  /** Always undefined for error responses */
  result?: undefined;
  /** Error message describing what went wrong */
  error: string;
};

/**
 * Universal response format for all JSBridge methods.
 *
 * @remarks
 * All JSBridge method calls resolve to this union type.
 *
 * @public
 */
export type BridgeResponse<T> =
  | BridgeSuccessResponse<T>
  | BridgeNoResultResponse
  | BridgeErrorResponse;

/** Map of individual status codes to their JSBridge response types */
export type StatusCodeMap<T> = {
  200: BridgeSuccessResponse<T>;
  204: BridgeNoResultResponse;
  302: BridgeNoResultResponse;
  400: BridgeErrorResponse;
  403: BridgeErrorResponse;
  424: BridgeErrorResponse;
  500: BridgeErrorResponse;
};

/**
 * Create a constrained JSBridge response type with only specific status codes.
 *
 * @example
 * // Only status code 200
 * type OnlySuccess = ConstrainedBridgeResponse<string, 200>;
 *
 * // Only status codes 200 and 500
 * type SuccessOrServerError = ConstrainedBridgeResponse<string, 200 | 500>;
 *
 * // Only error status codes
 * type OnlyErrors = ConstrainedBridgeResponse<string, 400 | 403 | 424 | 500>;
 *
 * @public
 */
export type ConstrainedBridgeResponse<
  T,
  Codes extends keyof StatusCodeMap<T>,
> = StatusCodeMap<T>[Codes];
