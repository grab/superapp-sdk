/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import * as v from 'valibot';

import { bridgeErrorSchema, bridgeSuccessSchema } from '../../core';

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResult}.
 *
 * @public
 */
export const GetLanguageLocaleIdentifierResultSchema = v.string();

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResponse}.
 *
 * @public
 */
export const GetLanguageLocaleIdentifierResponseSchema = v.union([
  bridgeSuccessSchema(GetLanguageLocaleIdentifierResultSchema),
  bridgeErrorSchema(500),
  bridgeErrorSchema(501),
]);
