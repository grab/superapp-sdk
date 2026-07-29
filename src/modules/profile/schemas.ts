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
  FetchEmailResponse,
  FetchEmailResult,
  ShowAddressPickerResponse,
  ShowAddressPickerResult,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailResult,
} from './types';

/**
 * Valibot schema for {@link FetchEmailResult}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const FetchEmailResultSchema: v.GenericSchema<FetchEmailResult> = v.object({
  email: v.string(),
});

/**
 * Valibot schema for {@link FetchEmailResponse}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const FetchEmailResponseSchema: v.GenericSchema<FetchEmailResponse> = v.union([
  sdkOkResponseSchema(FetchEmailResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link ShowAddressPickerResult}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const ShowAddressPickerResultSchema: v.GenericSchema<ShowAddressPickerResult> = v.object({
  address: v.string(),
  full_address: v.string(),
  unit_detail: v.string(),
  latitude: v.number(),
  longitude: v.number(),
  country_code: v.string(),
  city: v.string(),
  postal_code: v.number(),
});

/**
 * Valibot schema for {@link ShowAddressPickerResponse}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const ShowAddressPickerResponseSchema: v.GenericSchema<ShowAddressPickerResponse> = v.union([
  sdkOkResponseSchema(ShowAddressPickerResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * Valibot schema for {@link VerifyEmailRequest}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const VerifyEmailRequestSchema: v.GenericSchema<VerifyEmailRequest> = v.object({
  email: v.optional(v.pipe(v.string(), v.minLength(1))),
  skipUserInput: v.optional(v.boolean()),
});

/**
 * Valibot schema for {@link VerifyEmailResult}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const VerifyEmailResultSchema: v.GenericSchema<VerifyEmailResult> = v.object({
  email: v.string(),
});

/**
 * Valibot schema for {@link VerifyEmailResponse}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export const VerifyEmailResponseSchema: v.GenericSchema<VerifyEmailResponse> = v.union([
  sdkOkResponseSchema(VerifyEmailResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(400),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(426),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
