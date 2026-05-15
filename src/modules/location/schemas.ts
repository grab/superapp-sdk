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
  ObserveLocationChangeResponse,
} from './types';

/**
 * Valibot schema for {@link GetCoordinateResult}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCoordinateResultSchema: v.GenericSchema<GetCoordinateResult> = v.object({
  latitude: v.number(),
  longitude: v.number(),
});

/**
 * Valibot schema for {@link GetCoordinateResponse}.
 *
 * @group Modules
 * @category Location
 *
 * @public
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
export const ObserveLocationChangeResponseSchema: v.GenericSchema<
  Awaited<ObserveLocationChangeResponse>
> = v.union([
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
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCountryCodeResultSchema: v.GenericSchema<GetCountryCodeResult> = v.string();

/**
 * Valibot schema for {@link GetCountryCodeResponse}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCountryCodeResponseSchema: v.GenericSchema<GetCountryCodeResponse> = v.union([
  sdkOkResponseSchema(GetCountryCodeResultSchema),
  sdkNoContentResponseSchema,
  sdkErrorResponseSchema(403),
  sdkErrorResponseSchema(424),
  sdkErrorResponseSchema(500),
  sdkErrorResponseSchema(501),
]);
