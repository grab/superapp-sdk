/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

/**
 * Schema builder for bridge error responses (4xx / 5xx).
 *
 * @returns A valibot object schema with `status_code` and `error` fields.
 * @internal
 */
export const bridgeErrorSchema = <T extends number>(
  code: T
): v.ObjectSchema<
  {
    readonly status_code: v.LiteralSchema<T, undefined>;
    readonly error: v.StringSchema<undefined>;
  },
  undefined
> => v.object({ status_code: v.literal(code), error: v.string() });

/**
 * Schema builder for bridge 200 success responses with a result payload.
 *
 * @returns A valibot object schema with `status_code: 200` and a typed `result` field.
 * @internal
 */
export const bridgeSuccessSchema = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  result: T
): v.ObjectSchema<
  {
    readonly status_code: v.LiteralSchema<200, undefined>;
    readonly result: T;
  },
  undefined
> => v.object({ status_code: v.literal(200), result });

/**
 * Schema for bridge 204 No Content responses.
 *
 * @internal
 */
export const bridgeNoContentSchema = v.object({ status_code: v.literal(204) });

/**
 * Schema for bridge 200 OK responses without a result payload.
 *
 * @internal
 */
export const bridgeOkSchema = v.object({ status_code: v.literal(200) });

/**
 * Schema for bridge 302 Redirect responses.
 *
 * @internal
 */
export const bridgeRedirectSchema = v.object({ status_code: v.literal(302) });
