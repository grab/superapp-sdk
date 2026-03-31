/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { BridgeResponse } from './types';

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
 *   // response narrowed to the 200/204 variants of the response union
 *   if (response.status_code === 200) {
 *     console.log(response.result);
 *   }
 * }
 * ```
 *
 * @public
 */
export function isSuccess<T extends BridgeResponse>(
  response: T
): response is Extract<T, { status_code: 200 | 204 }> {
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
 *   console.log('Redirecting...');
 * }
 * ```
 *
 * @public
 */
export function isRedirection<T extends BridgeResponse>(
  response: T
): response is Extract<T, { status_code: 302 }> {
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
 *   console.error('Client error:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isClientError<T extends BridgeResponse>(
  response: T
): response is Extract<T, { status_code: 400 | 401 | 403 | 404 | 424 | 426 }> {
  const c = response.status_code;
  return c === 400 || c === 401 || c === 403 || c === 404 || c === 424 || c === 426;
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
 *   console.error('Server error:', response.error);
 * }
 * ```
 *
 * @public
 */
export function isServerError<T extends BridgeResponse>(
  response: T
): response is Extract<T, { status_code: 500 | 501 }> {
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
 * if (isError(response)) {
 *   // response narrowed to error variants — error: string is guaranteed
 *   console.error('Error:', response.error);
 * } else {
 *   console.log('Success!');
 * }
 * ```
 *
 * @public
 */
export function isError<T extends BridgeResponse>(
  response: T
): response is Extract<T, { error: string }> {
  return 'error' in response;
}
