/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKResponse } from './types';

/**
 * Type guard to check if an SDK response has a success status code (`200`, `204`).
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response is successful, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isSuccess(response)) {
 *   // response narrowed to success variants
 *   console.log(response);
 * }
 * ```
 *
 * @public
 */
export function isSuccess<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 200 | 204 }> {
  return response.status_code === 200 || response.status_code === 204;
}

/**
 * Type guard to check if an SDK response has a `200` status code.
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response has `200` status code, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response)) {
 *   // response narrowed to status code `200` variant, `result` is available
 *   console.log(response.result);
 * }
 * ```
 *
 * @public
 */
export function isOk<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 200 }> {
  return response.status_code === 200;
}

/**
 * Type guard to check if an SDK response has a `204` status code.
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response has `204` status code, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isNoContent(response)) {
 *   // response narrowed to status code `204` variant, `result` is not available
 *   console.log('No content');
 * }
 * ```
 *
 * @public
 */
export function isNoContent<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 204 }> {
  return response.status_code === 204;
}

/**
 * Type guard to check if an SDK response has a `302` status code.
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response is a redirect, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isRedirection(response)) {
 *   // response narrowed to status code `302` variant
 *   console.log('Redirecting...');
 * }
 * ```
 *
 * @public
 */
export function isRedirection<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 302 }> {
  return response.status_code === 302;
}

/**
 * Type guard to check if an SDK response has a `302` status code.
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response has `302` status code, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isFound(response)) {
 *   // response narrowed to status code `302` variant
 *   console.log('Redirecting...');
 * }
 * ```
 *
 * @public
 */
export function isFound<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 302 }> {
  return response.status_code === 302;
}

/**
 * Type guard to check if an SDK response has a client error status code (`400`, `401`, `403`, `404`, `424`, `426`).
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response is a client error, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isClientError(response)) {
 *   // response narrowed to client error variants, `error` is available
 *   console.error(response.error);
 * }
 * ```
 *
 * @public
 */
export function isClientError<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 400 | 401 | 403 | 404 | 424 | 426 }> {
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
 * Type guard to check if an SDK response has a server error status code (`500`, `501`).
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response is a server error, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isServerError(response)) {
 *   // response narrowed to server error variants, `error` is available
 *   console.error(response.error);
 * }
 * ```
 *
 * @public
 */
export function isServerError<T extends SDKResponse>(
  response: T
): response is Extract<T, { status_code: 500 | 501 }> {
  return response.status_code === 500 || response.status_code === 501;
}

/**
 * Type guard to check if an SDK response has an error status code (`400`, `401`, `403`, `404`, `424`, `426`, `500`, `501`).
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response is an error, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isError(response)) {
 *   // response narrowed to error variants, `error` is available
 *   console.error(response.error);
 * }
 * ```
 *
 * @public
 */
export function isError<T extends SDKResponse>(
  response: T
): response is Extract<T, { error: string }> {
  return (
    response.status_code === 400 ||
    response.status_code === 401 ||
    response.status_code === 403 ||
    response.status_code === 404 ||
    response.status_code === 424 ||
    response.status_code === 426 ||
    response.status_code === 500 ||
    response.status_code === 501
  );
}

/**
 * Type guard to check if an SDK response has a `result` that is neither `null` nor `undefined`.
 *
 * @group Type Guards
 *
 * @param response - The SDK response to check
 * @returns `true` if the response has a `result` that is neither `null` nor `undefined`, `false` otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response) && hasResult(response)) {
 *   // response narrowed to status code `200` variant, and `result` is available
 *   console.log('Result:', response.result);
 * }
 * ```
 *
 * @public
 */
export function hasResult<T extends SDKResponse>(
  response: T
): response is Extract<T, { result: NonNullable<unknown> }> {
  return 'result' in response && response.result !== null && response.result !== undefined;
}
