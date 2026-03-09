/*!
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
export type BridgeStatusCode200Response<T> = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 200;
  /** The result data from the JSBridge method, or undefined if no result was returned */
  result: T;
};

/**
 * No result response with status code 204.
 *
 * @remarks
 * Returned when a JSBridge method completes with no content (e.g., user cancelled a dialog).
 * No `result` or `error` data is returned.
 *
 * @public
 */
export type BridgeStatusCode204Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 204;
};

/**
 * Union type representing all successful JSBridge responses.
 * Includes status codes 200 (with result data) and 204 (no content).
 *
 * @public
 */
export type BridgeSuccessResponse<T> = BridgeStatusCode200Response<T> | BridgeStatusCode204Response;

/**
 * Redirect response with status code 302.
 *
 * @remarks
 * Returned when a JSBridge method initiates a redirect (e.g., OAuth2 redirect flow).
 * No `result` or `error` data is returned as the page will navigate away.
 *
 * @public
 */
export type BridgeStatusCode302Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 302;
};

/**
 * Union type representing redirect JSBridge responses.
 * Currently only includes status code 302.
 *
 * @public
 */
export type BridgeRedirectResponse = BridgeStatusCode302Response;

/**
 * Error response with status code 400
 *
 * @public
 */
export type BridgeStatusCode400Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 400;
  /** Error message if the call failed */
  error: string;
};

/**
 * Error response with status code 401
 *
 * @public
 */
export type BridgeStatusCode401Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 401;
  /** Error message if the call failed */
  error: string;
};

/**
 * Error response with status code 403
 *
 * @public
 */
export type BridgeStatusCode403Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 403;
  /** Error message if the call failed */
  error: string;
};

/**
 * Error response with status code 404
 *
 * @public
 */
export type BridgeStatusCode404Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 404;
  /** Error message if the call failed */
  error: string;
};

/**
 * Error response with status code 424
 *
 * @public
 */
export type BridgeStatusCode424Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 424;
  /** Error message if the call failed */
  error: string;
};

/**
 * Union type representing all client error JSBridge responses (4xx status codes).
 * Includes: 400 (Bad Request), 403 (Forbidden), 404 (Not Found), and 424 (Failed Dependency).
 *
 * @public
 */
export type BridgeClientErrorResponse =
  | BridgeStatusCode400Response
  | BridgeStatusCode401Response
  | BridgeStatusCode403Response
  | BridgeStatusCode404Response
  | BridgeStatusCode424Response;

/**
 * Error response with status code 500
 *
 * @public
 */
export type BridgeStatusCode500Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 500;
  /** Error message if the call failed */
  error: string;
};

/**
 * Error response with status code 501
 *
 * @remarks
 * Returned when a JSBridge method is called outside the Grab app environment.
 * This indicates the method is not implemented in the current environment.
 *
 * @public
 */
export type BridgeStatusCode501Response = {
  /** HTTP-style status code indicating the outcome of the JSBridge method call */
  status_code: 501;
  /** Error message indicating the method is not available in this environment */
  error: string;
};

/**
 * Union type representing server error JSBridge responses (5xx status codes).
 * Includes status codes 500 (Internal Server Error) and 501 (Not Implemented).
 *
 * @public
 */
export type BridgeServerErrorResponse = BridgeStatusCode500Response | BridgeStatusCode501Response;

/**
 * Union type representing all error JSBridge responses (4xx and 5xx status codes).
 * Combines both client errors and server errors.
 *
 * @public
 */
export type BridgeErrorResponse = BridgeClientErrorResponse | BridgeServerErrorResponse;

/**
 * Universal response format for all JSBridge methods.
 *
 * @remarks
 * All JSBridge method calls resolve to this type. After destructuring,
 * use type guards (e.g., if (error), if (status_code === 200)) to narrow the type.
 *
 * @public
 */
export type BridgeResponse<T> =
  | BridgeSuccessResponse<T>
  | BridgeRedirectResponse
  | BridgeClientErrorResponse
  | BridgeServerErrorResponse;

/**
 * Map of individual status codes to their JSBridge response types.
 * Used internally by ConstrainedBridgeResponse to select specific response types.
 *
 * @public
 */
export type StatusCodeMap<T> = {
  200: BridgeStatusCode200Response<T>;
  204: BridgeStatusCode204Response;
  302: BridgeStatusCode302Response;
  400: BridgeStatusCode400Response;
  401: BridgeStatusCode401Response;
  403: BridgeStatusCode403Response;
  404: BridgeStatusCode404Response;
  424: BridgeStatusCode424Response;
  500: BridgeStatusCode500Response;
  501: BridgeStatusCode501Response;
};

/**
 * Create a constrained JSBridge response type with only specific status codes.
 *
 * @example
 * ```typescript
 * // Only status code 200
 * type OnlySuccess = ConstrainedBridgeResponse<string, 200>;
 *
 * // Only status codes 200 and 500
 * type SuccessOrServerError = ConstrainedBridgeResponse<string, 200 | 500>;
 *
 * // Only error status codes
 * type OnlyErrors = ConstrainedBridgeResponse<string, 400 | 403 | 424 | 500>;
 * ```
 *
 * @public
 */
export type ConstrainedBridgeResponse<
  T,
  Codes extends keyof StatusCodeMap<T>,
> = StatusCodeMap<T>[Codes];
