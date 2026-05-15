/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  RawSendResponseSchema,
  RawSendResultSchema,
  SendRequestSchema,
  SendResponseSchema,
  SendResultSchema,
} from './schemas';

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
export type SendRequest = InferOutput<typeof SendRequestSchema>;

/**
 * Result object containing the network response data.
 *
 * @group Modules
 * @category Network
 *
 * @remarks
 * The result type is `Record<string, unknown>` as response bodies are always
 * returned as objects. String responses from the native bridge are automatically
 * parsed to JSON.
 *
 * @public
 */
export type SendResult = InferOutput<typeof SendResultSchema>;

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
export type SendResponse = InferOutput<typeof SendResponseSchema>;

/**
 * Internal type for the raw bridge response result.
 * The native bridge may return either a JSON string or a parsed Record.
 *
 * @internal
 */
export type RawSendResult = InferOutput<typeof RawSendResultSchema>;

/**
 * Internal type for the raw bridge response before transformation.
 * Used internally to handle the native bridge response format.
 *
 * @internal
 */
export type RawSendResponse = InferOutput<typeof RawSendResponseSchema>;
