/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

/**
 * Valibot schema for {@link GetCoordinateResult}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCoordinateResultSchema = v.object({ latitude: v.number(), longitude: v.number() });

/**
 * Valibot schema for {@link GetCoordinateResponse}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCoordinateResponseSchema = v.union([
  bridgeOkSchema(GetCoordinateResultSchema),
  bridgeErrorSchema(403),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * @internal
 */
export const ObserveLocationChangeResponseSchema = v.union([
  bridgeOkSchema(GetCoordinateResultSchema),
  bridgeErrorSchema(400),
  bridgeErrorSchema(403),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);

/**
 * Valibot schema for {@link GetCountryCodeResult}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCountryCodeResultSchema = v.string();

/**
 * Valibot schema for {@link GetCountryCodeResponse}.
 *
 * @group Modules
 * @category Location
 *
 * @public
 */
export const GetCountryCodeResponseSchema = v.union([
  bridgeOkSchema(GetCountryCodeResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(403),
  bridgeErrorSchema(424),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
