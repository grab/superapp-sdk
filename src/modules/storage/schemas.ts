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
 * @internal
 */
const storageKeyField = v.pipe(v.string(), v.minLength(1));

/**
 * @internal
 */
const storageKeySchema = v.object({ key: storageKeyField });

/**
 * Valibot schema for {@link SetBooleanRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetBooleanRequestSchema = v.object({
  key: storageKeyField,
  value: v.boolean(),
});

/**
 * Valibot schema for {@link SetBooleanResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetBooleanResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetBooleanRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetBooleanRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetBooleanResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetBooleanResultSchema = v.boolean();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getBoolean` before normalization.
 *
 * @internal
 */
export const RawGetBooleanResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.boolean()),
  }),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
]);

/**
 * Valibot schema for {@link GetBooleanResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetBooleanResponseSchema = v.union([
  sdkOkResponseSchema(GetBooleanResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetIntRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetIntRequestSchema = v.object({
  key: storageKeyField,
  value: v.number(),
});

/**
 * Valibot schema for {@link SetIntResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetIntResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetIntRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetIntRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetIntResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetIntResultSchema = v.number();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getInt` before normalization.
 *
 * @internal
 */
export const RawGetIntResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.number()),
  }),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
]);

/**
 * Valibot schema for {@link GetIntResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetIntResponseSchema = v.union([
  sdkOkResponseSchema(GetIntResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetStringRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetStringRequestSchema = v.object({
  key: storageKeyField,
  value: v.string(),
});

/**
 * Valibot schema for {@link SetStringResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetStringResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetStringRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetStringRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetStringResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetStringResultSchema = v.string();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getString` before normalization.
 *
 * @internal
 */
export const RawGetStringResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.string()),
  }),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
]);

/**
 * Valibot schema for {@link GetStringResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetStringResponseSchema = v.union([
  sdkOkResponseSchema(GetStringResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link SetDoubleRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetDoubleRequestSchema = v.object({
  key: storageKeyField,
  value: v.number(),
});

/**
 * Valibot schema for {@link SetDoubleResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetDoubleResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetDoubleRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetDoubleRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetDoubleResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetDoubleResultSchema = v.number();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getDouble` before normalization.
 *
 * @internal
 */
export const RawGetDoubleResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.number()),
  }),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
]);

/**
 * Valibot schema for {@link GetDoubleResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetDoubleResponseSchema = v.union([
  sdkOkResponseSchema(GetDoubleResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * @internal
 */
export const RemoveRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link RemoveResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const RemoveResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link RemoveAllResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const RemoveAllResponseSchema = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
