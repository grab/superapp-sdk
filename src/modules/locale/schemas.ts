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
  GetLanguageLocaleIdentifierResponse,
  GetLanguageLocaleIdentifierResult,
} from './types';

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResult}.
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export const GetLanguageLocaleIdentifierResultSchema: v.GenericSchema<GetLanguageLocaleIdentifierResult> =
  v.string();

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResponse}.
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export const GetLanguageLocaleIdentifierResponseSchema: v.GenericSchema<GetLanguageLocaleIdentifierResponse> =
  v.union([
    sdkOkResponseSchema(GetLanguageLocaleIdentifierResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);
