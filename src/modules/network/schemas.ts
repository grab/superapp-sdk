/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

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
 * @public
 */
export const SendResultSchema = v.record(v.string(), v.unknown());

/**
 * Schema builder for successful HTTP responses with any status code.
 *
 * @returns A valibot object schema with `status_code` (number) and `result` fields.
 * @internal
 */
const networkOkSchema = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  result: T
): v.ObjectSchema<
  {
    readonly status_code: v.NumberSchema<undefined>;
    readonly result: T;
  },
  undefined
> => v.object({ status_code: v.number(), result });

/**
 * Schema builder for HTTP error responses with any status code.
 *
 * @returns A valibot object schema with `status_code` (number) and `error` fields.
 * @internal
 */
const networkErrorSchema = (): v.ObjectSchema<
  {
    readonly status_code: v.NumberSchema<undefined>;
    readonly error: v.StringSchema<undefined>;
  },
  undefined
> => v.object({ status_code: v.number(), error: v.string() });

/**
 * Valibot schema for {@link SendResponse}.
 *
 * @public
 */
export const SendResponseSchema = v.union([
  networkOkSchema(SendResultSchema),
  networkErrorSchema(),
]);
