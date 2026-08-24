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
  RemoveRequest,
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
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetBooleanRequestSchema: v.GenericSchema<SetBooleanRequest> = v.object({
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
export const SetBooleanResponseSchema: v.GenericSchema<SetBooleanResponse> = v.variant(
  'status_code',
  [
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

/**
 * Valibot schema for {@link GetBooleanRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetBooleanRequestSchema: v.GenericSchema<GetBooleanRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetBooleanResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetBooleanResultSchema: v.GenericSchema<GetBooleanResult> = v.boolean();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getBoolean` before normalization.
 *
 * @internal
 */
export const RawGetBooleanResponseSchema: v.GenericSchema<RawGetBooleanResponse> = v.variant(
  'status_code',
  [
    v.object({
      status_code: v.literal(200),
      result: v.nullish(v.boolean()),
    }),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
  ]
);

/**
 * Valibot schema for {@link GetBooleanResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetBooleanResponseSchema: v.GenericSchema<GetBooleanResponse> = v.variant(
  'status_code',
  [
    sdkOkResponseSchema(GetBooleanResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

/**
 * Valibot schema for {@link SetIntRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetIntRequestSchema: v.GenericSchema<SetIntRequest> = v.object({
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
export const SetIntResponseSchema: v.GenericSchema<SetIntResponse> = v.variant('status_code', [
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
export const GetIntRequestSchema: v.GenericSchema<GetIntRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetIntResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetIntResultSchema: v.GenericSchema<GetIntResult> = v.number();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getInt` before normalization.
 *
 * @internal
 */
export const RawGetIntResponseSchema: v.GenericSchema<RawGetIntResponse> = v.variant(
  'status_code',
  [
    v.object({
      status_code: v.literal(200),
      result: v.nullish(v.number()),
    }),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
  ]
);

/**
 * Valibot schema for {@link GetIntResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetIntResponseSchema: v.GenericSchema<GetIntResponse> = v.variant('status_code', [
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
export const SetStringRequestSchema: v.GenericSchema<SetStringRequest> = v.object({
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
export const SetStringResponseSchema: v.GenericSchema<SetStringResponse> = v.variant(
  'status_code',
  [
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

/**
 * Valibot schema for {@link GetStringRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetStringRequestSchema: v.GenericSchema<GetStringRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetStringResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetStringResultSchema: v.GenericSchema<GetStringResult> = v.string();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getString` before normalization.
 *
 * @internal
 */
export const RawGetStringResponseSchema: v.GenericSchema<RawGetStringResponse> = v.variant(
  'status_code',
  [
    v.object({
      status_code: v.literal(200),
      result: v.nullish(v.string()),
    }),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
  ]
);

/**
 * Valibot schema for {@link GetStringResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetStringResponseSchema: v.GenericSchema<GetStringResponse> = v.variant(
  'status_code',
  [
    sdkOkResponseSchema(GetStringResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

/**
 * Valibot schema for {@link SetDoubleRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const SetDoubleRequestSchema: v.GenericSchema<SetDoubleRequest> = v.object({
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
export const SetDoubleResponseSchema: v.GenericSchema<SetDoubleResponse> = v.variant(
  'status_code',
  [
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

/**
 * Valibot schema for {@link GetDoubleRequest}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetDoubleRequestSchema: v.GenericSchema<GetDoubleRequest> = storageKeySchema;

/**
 * Valibot schema for {@link GetDoubleResult}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetDoubleResultSchema: v.GenericSchema<GetDoubleResult> = v.number();

/**
 * Internal valibot schema for the raw `JSBridge` response from `getDouble` before normalization.
 *
 * @internal
 */
export const RawGetDoubleResponseSchema: v.GenericSchema<RawGetDoubleResponse> = v.variant(
  'status_code',
  [
    v.object({
      status_code: v.literal(200),
      result: v.nullish(v.number()),
    }),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
  ]
);

/**
 * Valibot schema for {@link GetDoubleResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const GetDoubleResponseSchema: v.GenericSchema<GetDoubleResponse> = v.variant(
  'status_code',
  [
    sdkOkResponseSchema(GetDoubleResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);

/**
 * @internal
 */
export const RemoveRequestSchema: v.GenericSchema<RemoveRequest> = storageKeySchema;

/**
 * Valibot schema for {@link RemoveResponse}.
 *
 * @group Modules
 * @category Storage
 *
 * @public
 */
export const RemoveResponseSchema: v.GenericSchema<RemoveResponse> = v.variant('status_code', [
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
export const RemoveAllResponseSchema: v.GenericSchema<RemoveAllResponse> = v.variant(
  'status_code',
  [
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]
);
