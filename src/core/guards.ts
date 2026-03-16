/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type {
  BridgeClientError,
  BridgeError,
  BridgeRedirection,
  BridgeResponse,
  BridgeServerError,
  BridgeStatusCode,
  BridgeSuccessResponse,
} from './types';

/**
 * Type guard to check if a JSBridge response is successful (status codes 200 or 204).
 *
 * @param response - The JSBridge response to check
 * @returns True if the response is successful (200 or 204), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isSuccess(response)) {
 *   // response is narrowed to BridgeSuccessResponse<T>
 *   if (response.status_code === 200) {
 *     console.log(response.result);
 *   }
 * }
 * ```
 *
 * @public
 */
export function isSuccess<T>(
  response: BridgeResponse<BridgeStatusCode, T>
): response is BridgeSuccessResponse<T> {
  return response.status_code === 200 || response.status_code === 204;
}

/**
 * Type guard to check if a JSBridge response is a redirect (status code 302).
 *
 * @param response - The JSBridge response to check
 * @returns True if the response is a redirect (302), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isRedirection(response)) {
 *   // response is narrowed to BridgeRedirection
 *   console.log('Redirecting...');
 * }
 * ```
 *
 * @public
 */
export function isRedirection<T>(
  response: BridgeResponse<BridgeStatusCode, T>
): response is BridgeRedirection {
  return response.status_code === 302;
}

/**
 * Type guard to check if a JSBridge response is a client error (4xx status codes).
 *
 * @param response - The JSBridge response to check
 * @returns True if the response is a client error (400, 401, 403, 404, 424, 426), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isClientError(response)) {
 *   // response is narrowed to BridgeClientError
 *   console.error('Client error:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isClientError<T>(
  response: BridgeResponse<BridgeStatusCode, T>
): response is BridgeClientError {
  return (
    response.status_code === 400 ||
    response.status_code === 401 ||
    response.status_code === 403 ||
    response.status_code === 404 ||
    response.status_code === 424 ||
    response.status_code === 426
  );
}

/**
 * Type guard to check if a JSBridge response is a server error (5xx status codes).
 *
 * @param response - The JSBridge response to check
 * @returns True if the response is a server error (500, 501), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isServerError(response)) {
 *   // response is narrowed to BridgeServerError
 *   console.error('Server error:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isServerError<T>(
  response: BridgeResponse<BridgeStatusCode, T>
): response is BridgeServerError {
  return response.status_code === 500 || response.status_code === 501;
}

/**
 * Type guard to check if a JSBridge response is an error (4xx or 5xx status codes).
 *
 * @param response - The JSBridge response to check
 * @returns True if the response is any error (4xx or 5xx), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isErrorResponse(response)) {
 *   // response is narrowed to BridgeError
 *   console.error('Error:', response.error);
 * } else {
 *   // response is successful or redirect
 *   console.log('Success!');
 * }
 * ```
 *
 * @public
 */
export function isErrorResponse<T>(
  response: BridgeResponse<BridgeStatusCode, T>
): response is BridgeError {
  return isClientError(response) || isServerError(response);
}
