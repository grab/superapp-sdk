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
 * @example
 * **GET request with headers:**
 * ```typescript
 * {
 *   endpoint: 'https://api.example.com/users',
 *   method: 'GET',
 *   headers: { 'Authorization': 'Bearer token123' }
 * }
 * ```
 *
 * @example
 * **POST request with body:**
 * ```typescript
 * {
 *   endpoint: 'https://api.example.com/users',
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: { name: 'John Doe', email: 'john@example.com' }
 * }
 * ```
 *
 * @example
 * **Request with query parameters and timeout:**
 * ```typescript
 * {
 *   endpoint: 'https://api.example.com/search',
 *   method: 'GET',
 *   query: { q: 'grab', limit: '10' },
 *   timeout: 30
 * }
 * ```
 *
 * @public
 */
export type SendRequest = {
  body?: unknown;
  endpoint: string;
  headers?: Record<string, string>;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  query?: Record<string, string>;
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
 * @remarks
 * This response can have any HTTP status code returned by the external API:
 * - Success codes (2xx): Contains the `result` with response data, except 204 which has no body.
 * - Client error codes (4xx): Contains an `error` message from the API.
 * - Server error codes (5xx): Contains an `error` message from the API.
 * - SDK error codes (400, 500, 501): Invalid request, internal SDK error, or not implemented.
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
