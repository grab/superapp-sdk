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
 * Union type representing server error JSBridge responses (5xx status codes).
 * Currently only includes status code 500 (Internal Server Error).
 *
 * @public
 */
export type BridgeServerErrorResponse = BridgeStatusCode500Response;

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
  403: BridgeStatusCode403Response;
  404: BridgeStatusCode404Response;
  424: BridgeStatusCode424Response;
  500: BridgeStatusCode500Response;
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

/**
 * Type guard that checks if the response is a success (status code 200 or 204).
 * Narrows the type to BridgeSuccessResponse<T> | BridgeNoResultResponse, excluding errors and redirects.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseSuccess(response)) {
 *   // Response is not an error, check isResponseOk() to access result
 * }
 * ```
 *
 * @public
 */
export function isResponseSuccess<T>(
  response: BridgeResponse<T>
): response is BridgeSuccessResponse<T> {
  return response.status_code === 200 || response.status_code === 204;
}

/**
 * Type guard that checks if the response is OK (status code 200).
 * Narrows the type to BridgeSuccessResponse<T>, giving access to the result.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseOk(response)) {
 *   console.log('QR Code:', response.result.qrCode);
 * }
 * ```
 *
 * @public
 */
export function isResponseOk<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode200Response<T> {
  return response.status_code === 200;
}

/**
 * Type guard that checks if the response has no content (status code 204).
 * This typically means the operation completed with no content to return.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseNoContent(response)) {
 *   console.log('No content available');
 * }
 * ```
 *
 * @public
 */
export function isResponseNoContent<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode204Response {
  return response.status_code === 204;
}

/**
 * Type guard that checks if the response is a redirect (status code 302).
 * This typically means a redirect occurred.
 *
 * @example
 * ```typescript
 * const response = await someModule.someMethod(request);
 * if (isResponseRedirect(response)) {
 *   console.log('Redirect occurred');
 * }
 * ```
 *
 * @public
 */
export function isResponseRedirect<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode302Response {
  return response.status_code === 302;
}

/**
 * Type guard that checks if the response is an error (status code 4xx or 5xx).
 * Narrows the type to BridgeErrorResponse, giving access to the error message.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseError(response)) {
 *   console.log('Error:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseError<T>(response: BridgeResponse<T>): response is BridgeErrorResponse {
  return (
    response.status_code === 400 ||
    response.status_code === 403 ||
    response.status_code === 404 ||
    response.status_code === 424 ||
    response.status_code === 500
  );
}

/**
 * Type guard that checks if the response is a client error (status code 400, 403, 404, or 424).
 * Narrows the type to client error responses.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseClientError(response)) {
 *   console.log('Client error:', response.status_code, response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseClientError<T>(
  response: BridgeResponse<T>
): response is BridgeClientErrorResponse {
  return (
    response.status_code === 400 ||
    response.status_code === 403 ||
    response.status_code === 404 ||
    response.status_code === 424
  );
}

/**
 * Type guard that checks if the response is a server error (status code 500).
 * Narrows the type to server error response.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseServerError(response)) {
 *   console.log('Server error - retry later:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseServerError<T>(
  response: BridgeResponse<T>
): response is BridgeServerErrorResponse {
  return response.status_code === 500;
}

/**
 * Type guard that checks if the response is a bad request error (status code 400).
 * Narrows the type to BridgeErrorResponse400.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseBadRequest(response)) {
 *   console.log('Bad request:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseBadRequest<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode400Response {
  return response.status_code === 400;
}

/**
 * Type guard that checks if the response is a forbidden error (status code 403).
 * Narrows the type to BridgeErrorResponse403.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseForbidden(response)) {
 *   console.log('Forbidden:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseForbidden<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode403Response {
  return response.status_code === 403;
}

/**
 * Type guard that checks if the response is a not found error (status code 404).
 * Narrows the type to BridgeErrorResponse404.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseNotFound(response)) {
 *   console.log('Not found:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseNotFound<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode404Response {
  return response.status_code === 404;
}

/**
 * Type guard that checks if the response is a failed dependency error (status code 424).
 * Narrows the type to BridgeErrorResponse424.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseFailedDependency(response)) {
 *   console.log('Failed dependency:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseFailedDependency<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode424Response {
  return response.status_code === 424;
}

/**
 * Type guard that checks if the response is an internal server error (status code 500).
 * Narrows the type to BridgeErrorResponse500.
 *
 * @example
 * ```typescript
 * const response = await cameraModule.scanQRCode(request);
 * if (isResponseInternalServerError(response)) {
 *   console.log('Internal server error:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isResponseInternalServerError<T>(
  response: BridgeResponse<T>
): response is BridgeStatusCode500Response {
  return response.status_code === 500;
}
