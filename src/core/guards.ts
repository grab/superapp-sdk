/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKClientErrorStatusCode, SDKResponse, SDKServerErrorStatusCode } from './types';

/**
 * Type guard to check if an SDK response has status code 2xx.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 2xx, false otherwise
 *
 * @example
 * ```typescript
 * const response = await someSdkMethod();
 * if (isOk(response)) {
 *   // response narrowed to 200 status code response — result is available
 *   console.log(response.result);
 * } else if (isNoContent(response)) {
 *   // 204 success with no payload
 *   console.log('Completed with no content');
 * }
 * ```
 *
 * @group Type Guards
 *
 * @public
 */
export function isSuccess<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 200 | 204 }> {
  return response.status_code >= 200 && response.status_code < 300;
}

/**
 * Type guard to check if an SDK response has status code 200.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 200, false otherwise
 *
 * @group Type Guards
 *
 * @public
 */
export function isOk<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 200 }> {
  return response.status_code === 200;
}

/**
 * Type guard to check if an SDK response has status code 204.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 204, false otherwise
 *
 * @group Type Guards
 *
 * @public
 */
export function isNoContent<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 204 }> {
  return response.status_code === 204;
}

/**
 * Type guard to check if an SDK response has a status code of 302.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 302, false otherwise
 *
 * @example
 * ```typescript
 * const response = await someSdkMethod();
 * if (isRedirection(response)) {
 *   console.log('Redirecting...');
 * }
 * ```
 *
 * @group Type Guards
 *
 * @public
 */
export function isRedirection<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 302 }> {
  return response.status_code === 302;
}

/**
 * Type guard to check if an SDK response has status code 302.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 302, false otherwise
 *
 * @group Type Guards
 *
 * @public
 */
export function isFound<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 302 }> {
  return response.status_code === 302;
}

/**
 * Type guard to check if an SDK response has a supported client error status code.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 400, 401, 403, 404, 424, or 426
 *
 * @example
 * ```typescript
 * const response = await someSdkMethod();
 * if (isClientError(response)) {
 *   console.error('Client error:', response.error);
 * }
 * ```
 *
 * @group Type Guards
 *
 * @public
 */
export function isClientError<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: SDKClientErrorStatusCode }> {
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
 * Type guard to check if an SDK response has a supported server error status code.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 500 or 501, false otherwise
 *
 * @example
 * ```typescript
 * const response = await someSdkMethod();
 * if (isServerError(response)) {
 *   console.error('Server error:', response.error);
 * }
 * ```
 *
 * @group Type Guards
 *
 * @public
 */
export function isServerError<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: SDKServerErrorStatusCode }> {
  return response.status_code === 500 || response.status_code === 501;
}

/**
 * Type guard to check if an SDK response has status code 4xx or 5xx.
 *
 * @param response - The SDK response to check
 * @returns True if the response has status code 4xx or 5xx, false otherwise
 *
 * @example
 * ```typescript
 * const response = await someSdkMethod();
 * if (isError(response)) {
 *   // response narrowed to error variants — error: string is guaranteed
 *   console.error('Error:', response.error);
 * } else {
 *   console.log('Success!');
 * }
 * ```
 *
 * @group Type Guards
 *
 * @public
 */
export function isError<T extends SDKResponse>(
  response: T
): response is Extract<T, { error: string }> {
  return (
    (response.status_code >= 400 && response.status_code < 600) ||
    (typeof response.error === 'string' && response.error.length > 0)
  );
}

/**
 * Type guard to check if an SDK response has a defined `result` (not null or undefined).
 *
 * @param response - The SDK response to check
 * @returns True if the response has a `result` that is neither null nor undefined, false otherwise
 *
 * @example
 * ```typescript
 * const response = await someSdkMethod();
 * if (isSuccess(response) && hasResult(response)) {
 *   // response.result is guaranteed to be defined
 *   console.log('Result:', response.result);
 * }
 * ```
 *
 * @group Type Guards
 *
 * @public
 */
export function hasResult<T extends SDKResponse>(
  response: T
): response is Extract<T, { result: NonNullable<unknown> }> {
  return 'result' in response && response.result !== null && response.result !== undefined;
}
