/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import {
  sdkErrorResponseSchema,
  sdkNoContentResponseSchema,
  sdkOkResponseSchema,
} from '../../core';

/**
 * Valibot schema for {@link SendRequest}.
 *
 * @group Modules
 * @category Network
 *
 * @remarks
 * This schema defines the structure of a network request with the following properties:
 * - `endpoint`: API endpoint URL to send the request to
 * - `method`: HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
 * - `headers`: Optional HTTP headers to include in the request
 * - `query`: Optional query parameters to append to the URL
 * - `body`: Optional request body data
 * - `timeout`: Optional timeout in seconds (default is 60 seconds)
 *
 * @public
 */
export const SendRequestSchema = v.object({
  endpoint: v.string(),
  method: v.picklist(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']),
  headers: v.optional(v.record(v.string(), v.string())),
  query: v.optional(v.record(v.string(), v.string())),
  body: v.optional(v.unknown()),
  timeout: v.optional(v.number()),
});

/**
 * Valibot schema for {@link SendResult}.
 *
 * @group Modules
 * @category Network
 *
 * @public
 */
export const SendResultSchema = v.record(v.string(), v.unknown());

/**
 * Valibot schema for {@link SendResponse}.
 *
 * @group Modules
 * @category Network
 *
 * @public
 */
export const SendResponseSchema = v.union([
  sdkOkResponseSchema(SendResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(401),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(404),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Internal valibot schema for the raw `JSBridge` response result.
 * `JSBridge` may return either a JSON string or a parsed Record.
 *
 * @internal
 */
export const RawSendResultSchema = v.union([v.string(), SendResultSchema]);

/**
 * Internal valibot schema for the raw `JSBridge` response.
 * Used to validate the response from `JSBridge` before transformation.
 *
 * @internal
 */
export const RawSendResponseSchema = v.union([
  sdkOkResponseSchema(RawSendResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(401),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(404),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
