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
import type {
  NativeSendResponse,
  NativeSendResult,
  SendRequest,
  SendResponse,
  SendResult,
} from './types';

/**
 * Valibot schema for {@link SendRequest}.
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
 * @internal
 */
export const SendRequestSchema: v.GenericSchema<SendRequest> = v.object({
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
 * @internal
 */
export const SendResultSchema: v.GenericSchema<SendResult> = v.record(v.string(), v.unknown());

/**
 * Valibot schema for {@link SendResponse}.
 *
 * @internal
 */
export const SendResponseSchema: v.GenericSchema<SendResponse> = v.union([
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
 * Internal valibot schema for the native response result.
 * The native JSBridge may return either a JSON string or a parsed Record.
 *
 * @internal
 */
export const NativeSendResultSchema: v.GenericSchema<NativeSendResult> = v.union([
  v.string(),
  SendResultSchema,
]);

/**
 * Internal valibot schema for the native response.
 * Used to validate the response from the native layer before transformation.
 *
 * @internal
 */
export const NativeSendResponseSchema: v.GenericSchema<NativeSendResponse> = v.union([
  sdkOkResponseSchema(NativeSendResultSchema),
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
