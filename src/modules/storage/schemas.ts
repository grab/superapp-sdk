/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

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
 * @public
 */
export const SetBooleanRequestSchema = v.object({
  key: storageKeyField,
  value: v.boolean(),
});

/**
 * Valibot schema for {@link SetBooleanResponse}.
 *
 * @public
 */
export const SetBooleanResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link GetBooleanRequest}.
 *
 * @public
 */
export const GetBooleanRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetBooleanResult}.
 *
 * @public
 */
export const GetBooleanResultSchema = v.boolean();

/**
 * Internal valibot schema for the raw bridge response from `getBoolean` before normalization.
 *
 * @internal
 */
export const RawGetBooleanResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.boolean()),
  }),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
]);

/**
 * Valibot schema for {@link GetBooleanResponse}.
 *
 * @public
 */
export const GetBooleanResponseSchema = v.union([
  bridgeOkSchema(GetBooleanResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link SetIntRequest}.
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
 * @public
 */
export const SetIntResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link GetIntRequest}.
 *
 * @public
 */
export const GetIntRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetIntResult}.
 *
 * @public
 */
export const GetIntResultSchema = v.number();

/**
 * Internal valibot schema for the raw bridge response from `getInt` before normalization.
 *
 * @internal
 */
export const RawGetIntResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.number()),
  }),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
]);

/**
 * Valibot schema for {@link GetIntResponse}.
 *
 * @public
 */
export const GetIntResponseSchema = v.union([
  bridgeOkSchema(GetIntResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link SetStringRequest}.
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
 * @public
 */
export const SetStringResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link GetStringRequest}.
 *
 * @public
 */
export const GetStringRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetStringResult}.
 *
 * @public
 */
export const GetStringResultSchema = v.string();

/**
 * Internal valibot schema for the raw bridge response from `getString` before normalization.
 *
 * @internal
 */
export const RawGetStringResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.string()),
  }),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
]);

/**
 * Valibot schema for {@link GetStringResponse}.
 *
 * @public
 */
export const GetStringResponseSchema = v.union([
  bridgeOkSchema(GetStringResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link SetDoubleRequest}.
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
 * @public
 */
export const SetDoubleResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link GetDoubleRequest}.
 *
 * @public
 */
export const GetDoubleRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link GetDoubleResult}.
 *
 * @public
 */
export const GetDoubleResultSchema = v.number();

/**
 * Internal valibot schema for the raw bridge response from `getDouble` before normalization.
 *
 * @internal
 */
export const RawGetDoubleResponseSchema = v.union([
  v.object({
    status_code: v.literal(200),
    result: v.nullish(v.number()),
  }),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
]);

/**
 * Valibot schema for {@link GetDoubleResponse}.
 *
 * @public
 */
export const GetDoubleResponseSchema = v.union([
  bridgeOkSchema(GetDoubleResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * @internal
 */
export const RemoveRequestSchema = storageKeySchema;

/**
 * Valibot schema for {@link RemoveResponse}.
 *
 * @public
 */
export const RemoveResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link RemoveAllResponse}.
 *
 * @public
 */
export const RemoveAllResponseSchema = v.union([
  bridgeNoContentSchema,
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
