/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link GetCoordinateResult}.
 *
 * @public
 */
export const GetCoordinateResultSchema = v.object({ lat: v.number(), lng: v.number() });

/**
 * Valibot schema for {@link GetCoordinateResponse}.
 *
 * @public
 */
export const GetCoordinateResponseSchema = v.union([
  bridgeSuccessSchema(GetCoordinateResultSchema),
  bridgeErrorSchema(403),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * @internal
 */
export const ObserveLocationChangeResponseSchema = GetCoordinateResponseSchema;

/**
 * Valibot schema for {@link GetCountryCodeResult}.
 *
 * @public
 */
export const GetCountryCodeResultSchema = v.string();

/**
 * Valibot schema for {@link GetCountryCodeResponse}.
 *
 * @public
 */
export const GetCountryCodeResponseSchema = v.union([
  bridgeSuccessSchema(GetCountryCodeResultSchema),
  bridgeErrorSchema(403),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
