/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for sending a network request.
 *
 * @group Modules
 * @category Network
 *
 * @public
 */
export type SendRequest = {
  /** Request payload body. */
  body?: unknown;
  /** Request endpoint URL. */
  endpoint: string;
  /** HTTP headers sent with the request. */
  headers?: Record<string, string>;
  /** HTTP method used for the request (for example, `"GET"` or `"POST"`). */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  /** Query parameters appended to the request URL. */
  query?: Record<string, string>;
  /** Request timeout in milliseconds. */
  timeout?: number;
};

/**
 * Result object containing the network response data.
 *
 * @group Modules
 * @category Network
 *
 * @remarks
 * The result type is `Record<string, unknown>` as response bodies are always
 * returned as objects. String responses from `JSBridge` are automatically
 * parsed to JSON.
 *
 * @public
 */
export type SendResult = Record<string, unknown>;

/**
 * Response when sending a network request.
 *
 * @group Modules
 * @category Network
 *
 * @public
 */
export type SendResponse =
  | SDKOkResponse<SendResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<401>
  | SDKErrorResponse<403>
  | SDKErrorResponse<404>
  | SDKErrorResponse<424>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Internal type for the raw `JSBridge` response result.
 * `JSBridge` may return either a JSON string or a parsed Record.
 *
 * @internal
 */
export type RawSendResult = string | SendResult;

/**
 * Internal type for the raw `JSBridge` response before transformation.
 * Used internally to handle the `JSBridge` response format.
 *
 * @internal
 */
export type RawSendResponse =
  | SDKOkResponse<RawSendResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<401>
  | SDKErrorResponse<403>
  | SDKErrorResponse<404>
  | SDKErrorResponse<424>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
