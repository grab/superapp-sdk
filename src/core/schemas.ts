/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import type { SDKErrorStatusCode } from './types';

/**
 * Schema builder for SDK error responses.
 * Only allows the SDK-defined error status codes.
 *
 * @returns A valibot object schema with `status_code` and `error` fields.
 * @internal
 */
export const sdkErrorResponseSchema = <T extends SDKErrorStatusCode>(
  code: T
): v.ObjectSchema<
  {
    readonly status_code: v.LiteralSchema<T, undefined>;
    readonly error: v.StringSchema<undefined>;
  },
  undefined
> => v.object({ status_code: v.literal(code), error: v.string() });

/**
 * Schema builder for SDK 200 status code response with a result payload.
 *
 * @returns A valibot object schema with `status_code: 200` and a typed `result` field.
 * @internal
 */
export const sdkOkResponseSchema = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  result: T
): v.ObjectSchema<
  {
    readonly status_code: v.LiteralSchema<200, undefined>;
    readonly result: T;
  },
  undefined
> => v.object({ status_code: v.literal(200), result });

/**
 * Schema for SDK 204 status code response.
 *
 * @internal
 */
export const sdkNoContentResponseSchema = v.object({ status_code: v.literal(204) });

/**
 * Schema for SDK 302 status code response.
 *
 * @internal
 */
export const sdkRedirectResponseSchema = v.object({ status_code: v.literal(302) });
