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
  GetBooleanRequest,
  GetBooleanResponse,
  GetBooleanResult,
  GetDoubleRequest,
  GetDoubleResponse,
  GetDoubleResult,
  GetIntRequest,
  GetIntResponse,
  GetIntResult,
  GetStringRequest,
  GetStringResponse,
  GetStringResult,
  RawGetBooleanResponse,
  RawGetDoubleResponse,
  RawGetIntResponse,
  RawGetStringResponse,
  RemoveAllResponse,
  RemoveResponse,
  SetBooleanRequest,
  SetBooleanResponse,
  SetDoubleRequest,
  SetDoubleResponse,
  SetIntRequest,
  SetIntResponse,
  SetStringRequest,
  SetStringResponse,
} from './types';

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
 * @internal
 */
export const SetBooleanRequestSchema: v.GenericSchema<SetBooleanRequest> = v.object({
  key: storageKeyField,
  value: v.boolean(),
});

/**
 * Valibot schema for {@link SetBooleanResponse}.
 *
 * @internal
 */
export const SetBooleanResponseSchema: v.GenericSchema<SetBooleanResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetBooleanRequest}.
 *
 * @internal
 */
export const GetBooleanRequestSchema: v.GenericSchema<GetBooleanRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetBooleanResult}.
 *
 * @internal
 */
export const GetBooleanResultSchema: v.GenericSchema<GetBooleanResult> = v.boolean();

/**
 * Internal valibot schema for the raw SDK response from `getBoolean` before normalization.
 *
 * @internal
 */
export const RawGetBooleanResponseSchema: v.GenericSchema<RawGetBooleanResponse> = v.union([
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
 * @internal
 */
export const GetBooleanResponseSchema: v.GenericSchema<GetBooleanResponse> = v.union([
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
 * @internal
 */
export const SetIntRequestSchema: v.GenericSchema<SetIntRequest> = v.object({
  key: storageKeyField,
  value: v.number(),
});

/**
 * Valibot schema for {@link SetIntResponse}.
 *
 * @internal
 */
export const SetIntResponseSchema: v.GenericSchema<SetIntResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetIntRequest}.
 *
 * @internal
 */
export const GetIntRequestSchema: v.GenericSchema<GetIntRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetIntResult}.
 *
 * @internal
 */
export const GetIntResultSchema: v.GenericSchema<GetIntResult> = v.number();

/**
 * Internal valibot schema for the raw SDK response from `getInt` before normalization.
 *
 * @internal
 */
export const RawGetIntResponseSchema: v.GenericSchema<RawGetIntResponse> = v.union([
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
 * @internal
 */
export const GetIntResponseSchema: v.GenericSchema<GetIntResponse> = v.union([
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
 * @internal
 */
export const SetStringRequestSchema: v.GenericSchema<SetStringRequest> = v.object({
  key: storageKeyField,
  value: v.string(),
});

/**
 * Valibot schema for {@link SetStringResponse}.
 *
 * @internal
 */
export const SetStringResponseSchema: v.GenericSchema<SetStringResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetStringRequest}.
 *
 * @internal
 */
export const GetStringRequestSchema: v.GenericSchema<GetStringRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetStringResult}.
 *
 * @internal
 */
export const GetStringResultSchema: v.GenericSchema<GetStringResult> = v.string();

/**
 * Internal valibot schema for the raw SDK response from `getString` before normalization.
 *
 * @internal
 */
export const RawGetStringResponseSchema: v.GenericSchema<RawGetStringResponse> = v.union([
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
 * @internal
 */
export const GetStringResponseSchema: v.GenericSchema<GetStringResponse> = v.union([
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
 * @internal
 */
export const SetDoubleRequestSchema: v.GenericSchema<SetDoubleRequest> = v.object({
  key: storageKeyField,
  value: v.number(),
});

/**
 * Valibot schema for {@link SetDoubleResponse}.
 *
 * @internal
 */
export const SetDoubleResponseSchema: v.GenericSchema<SetDoubleResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link GetDoubleRequest}.
 *
 * @internal
 */
export const GetDoubleRequestSchema: v.GenericSchema<GetDoubleRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetDoubleResult}.
 *
 * @internal
 */
export const GetDoubleResultSchema: v.GenericSchema<GetDoubleResult> = v.number();

/**
 * Internal valibot schema for the raw SDK response from `getDouble` before normalization.
 *
 * @internal
 */
export const RawGetDoubleResponseSchema: v.GenericSchema<RawGetDoubleResponse> = v.union([
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
 * @internal
 */
export const GetDoubleResponseSchema: v.GenericSchema<GetDoubleResponse> = v.union([
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
 * @internal
 */
export const RemoveResponseSchema: v.GenericSchema<RemoveResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link RemoveAllResponse}.
 *
 * @internal
 */
export const RemoveAllResponseSchema: v.GenericSchema<RemoveAllResponse> = v.union([
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
