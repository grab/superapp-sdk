/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeNoContentSchema, bridgeOkSchema } from '../../core';

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResult}.
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export const GetLanguageLocaleIdentifierResultSchema = v.string();

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResponse}.
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export const GetLanguageLocaleIdentifierResponseSchema = v.union([
  bridgeOkSchema(GetLanguageLocaleIdentifierResultSchema),
  bridgeNoContentSchema,
  bridgeErrorSchema(400),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
