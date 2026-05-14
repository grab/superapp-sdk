/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * HTTP methods supported by the `SendRequest` interface.
 *
 * @group Modules
 * @category Network
 *
 * @public
 */
export type SendRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

/**
 * Request parameters for sending a network request.
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
 * @group Modules
 * @category Network
 *
 * @public
 */
export interface SendRequest {
  /** Absolute URL of the API endpoint to call. */
  endpoint: string;
  /** HTTP verb for the request. */
  method: SendRequestMethod;
  /** Optional HTTP headers merged with the native request. */
  headers?: Record<string, string>;
  /** Optional query string parameters (string values). */
  query?: Record<string, string>;
  /** Optional request body for methods that accept a payload (JSON-serialized when applicable). */
  body?: unknown;
  /**
   * Optional request timeout in seconds.
   *
   * @defaultValue Native default when omitted
   */
  timeout?: number;
}

/**
 * Result object containing the network response data.
 *
 * @remarks
 * The result type is `Record<string, unknown>` as response bodies are always
 * returned as objects. String responses from the native JSBridge are automatically
 * parsed to JSON.
 *
 * @example
 * ```typescript
 * { users: [{ id: '1', name: 'Ada' }], total: 1 }
 * ```
 *
 * @group Modules
 * @category Network
 *
 * @public
 */
export type SendResult = Record<string, unknown>;

/**
 * Response returned by {@link NetworkModule.send}.
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
 * Internal type for the raw SDK response result.
 * The native JSBridge may return either a JSON string or a parsed Record.
 *
 * @internal
 */
export type RawSendResult = string | SendResult;

/**
 * Internal type for the raw SDK response before transformation.
 * Used internally to handle the native SDK response format.
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
