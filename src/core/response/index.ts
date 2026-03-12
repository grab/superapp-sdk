/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type {
  BridgeClientErrorResponse,
  BridgeErrorResponse,
  BridgeRedirectionResponse,
  BridgeResponse,
  BridgeServerErrorResponse,
  BridgeSuccessResponse,
} from './types';

export {
  BridgeClientErrorResponse,
  BridgeErrorResponse,
  BridgeRedirectionResponse,
  BridgeResponse,
  BridgeServerErrorResponse,
  BridgeStatusCode200Response,
  BridgeStatusCode204Response,
  BridgeStatusCode302Response,
  BridgeStatusCode400Response,
  BridgeStatusCode401Response,
  BridgeStatusCode403Response,
  BridgeStatusCode404Response,
  BridgeStatusCode424Response,
  BridgeStatusCode500Response,
  BridgeStatusCode501Response,
  BridgeSuccessResponse,
  ConstrainedBridgeResponse,
  StatusCodeMap,
} from './types';

/**
 * Type guard to check if a BridgeResponse is not an error (i.e., not a 4xx or 5xx status code).
 *
 * @param response - The BridgeResponse to check
 * @returns True if the response is a success (200, 204) or redirect (302), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response)) {
 *   // response is narrowed to BridgeSuccessResponse | BridgeRedirectResponse
 *   // You can safely access response.result (if status_code === 200)
 * } else {
 *   // response is narrowed to BridgeErrorResponse
 *   // Access response.error
 * }
 * ```
 */
export function isSuccess<T>(response: BridgeResponse<T>): response is BridgeSuccessResponse<T> {
  return response.status_code === 200 || response.status_code === 204;
}

/**
 * Type guard to check if a BridgeResponse is not an error (i.e., not a 4xx or 5xx status code).
 *
 * @param response - The BridgeResponse to check
 * @returns True if the response is a success (200, 204) or redirect (302), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response)) {
 *   // response is narrowed to BridgeSuccessResponse | BridgeRedirectResponse
 *   // You can safely access response.result (if status_code === 200)
 * } else {
 *   // response is narrowed to BridgeErrorResponse
 *   // Access response.error
 * }
 * ```
 */
export function isRedirection<T>(
  response: BridgeResponse<T>
): response is BridgeRedirectionResponse {
  return response.status_code === 302;
}

/**
 * Type guard to check if a BridgeResponse is not an error (i.e., not a 4xx or 5xx status code).
 *
 * @param response - The BridgeResponse to check
 * @returns True if the response is a success (200, 204) or redirect (302), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response)) {
 *   // response is narrowed to BridgeSuccessResponse | BridgeRedirectResponse
 *   // You can safely access response.result (if status_code === 200)
 * } else {
 *   // response is narrowed to BridgeErrorResponse
 *   // Access response.error
 * }
 * ```
 */
export function isClientError<T>(
  response: BridgeResponse<T>
): response is BridgeClientErrorResponse {
  return (
    response.status_code === 400 ||
    response.status_code === 401 ||
    response.status_code === 403 ||
    response.status_code === 404 ||
    response.status_code === 424
  );
}

/**
 * Type guard to check if a BridgeResponse is not an error (i.e., not a 4xx or 5xx status code).
 *
 * @param response - The BridgeResponse to check
 * @returns True if the response is a success (200, 204) or redirect (302), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response)) {
 *   // response is narrowed to BridgeSuccessResponse | BridgeRedirectResponse
 *   // You can safely access response.result (if status_code === 200)
 * } else {
 *   // response is narrowed to BridgeErrorResponse
 *   // Access response.error
 * }
 * ```
 */
export function isServerError<T>(
  response: BridgeResponse<T>
): response is BridgeServerErrorResponse {
  return response.status_code === 500 || response.status_code === 501;
}

/**
 * Type guard to check if a BridgeResponse is not an error (i.e., not a 4xx or 5xx status code).
 *
 * @param response - The BridgeResponse to check
 * @returns True if the response is a success (200, 204) or redirect (302), false otherwise
 *
 * @example
 * ```typescript
 * const response = await someBridgeMethod();
 * if (isOk(response)) {
 *   // response is narrowed to BridgeSuccessResponse | BridgeRedirectResponse
 *   // You can safely access response.result (if status_code === 200)
 * } else {
 *   // response is narrowed to BridgeErrorResponse
 *   // Access response.error
 * }
 * ```
 */
export function isErrorResponse<T>(response: BridgeResponse<T>): response is BridgeErrorResponse {
  return isClientError(response) || isServerError(response);
}
