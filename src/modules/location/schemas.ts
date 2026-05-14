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
  GetCoordinateResponse,
  GetCoordinateResult,
  GetCountryCodeResponse,
  GetCountryCodeResult,
  ObserveLocationChangeResult,
} from './types';

/**
 * Valibot schema for {@link GetCoordinateResult}.
 *
 * @internal
 */
export const GetCoordinateResultSchema: v.GenericSchema<GetCoordinateResult> = v.object({
  latitude: v.number(),
  longitude: v.number(),
});

/**
 * Valibot schema for {@link GetCoordinateResponse}.
 *
 * @internal
 */
export const GetCoordinateResponseSchema: v.GenericSchema<GetCoordinateResponse> = v.union([
  sdkOkResponseSchema(GetCoordinateResultSchema),
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);

/**
 * @internal
 */
export const ObserveLocationChangeResponseSchema: v.GenericSchema<ObserveLocationChangeResult> =
  v.union([
    sdkOkResponseSchema(GetCoordinateResultSchema),
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(403),
    sdkErrorResponseSchema(424),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);

/**
 * Valibot schema for {@link GetCountryCodeResult}.
 *
 * @internal
 */
export const GetCountryCodeResultSchema: v.GenericSchema<GetCountryCodeResult> = v.string();

/**
 * Valibot schema for {@link GetCountryCodeResponse}.
 *
 * @internal
 */
export const GetCountryCodeResponseSchema: v.GenericSchema<GetCountryCodeResponse> = v.union([
  sdkOkResponseSchema(GetCountryCodeResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
