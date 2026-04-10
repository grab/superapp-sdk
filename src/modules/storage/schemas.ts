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
const storageKeySchema = v.object({ key: v.pipe(v.string(), v.minLength(1)) });

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
export const GetBooleanResultSchema = v.object({ value: v.nullable(v.boolean()) });
/**
 * Valibot schema for {@link GetBooleanResponse}.
 *
 * @public
 */
export const GetBooleanResponseSchema = v.union([
  bridgeOkSchema(GetBooleanResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

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
export const GetIntResultSchema = v.object({ value: v.nullable(v.number()) });
/**
 * Valibot schema for {@link GetIntResponse}.
 *
 * @public
 */
export const GetIntResponseSchema = v.union([
  bridgeOkSchema(GetIntResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

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
export const GetStringResultSchema = v.object({ value: v.nullable(v.string()) });
/**
 * Valibot schema for {@link GetStringResponse}.
 *
 * @public
 */
export const GetStringResponseSchema = v.union([
  bridgeOkSchema(GetStringResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

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
export const GetDoubleResultSchema = v.object({ value: v.nullable(v.number()) });
/**
 * Valibot schema for {@link GetDoubleResponse}.
 *
 * @public
 */
export const GetDoubleResponseSchema = v.union([
  bridgeOkSchema(GetDoubleResultSchema),
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
