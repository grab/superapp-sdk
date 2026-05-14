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
 * @internal
 */
export const GetLanguageLocaleIdentifierResultSchema: v.GenericSchema<GetLanguageLocaleIdentifierResult> =
  v.string();

/**
 * Valibot schema for {@link GetLanguageLocaleIdentifierResponse}.
 *
 * @internal
 */
export const GetLanguageLocaleIdentifierResponseSchema: v.GenericSchema<GetLanguageLocaleIdentifierResponse> =
  v.union([
    sdkOkResponseSchema(GetLanguageLocaleIdentifierResultSchema),
    sdkNoContentResponseSchema,
    sdkErrorResponseSchema(400),
    sdkErrorResponseSchema(500),
    sdkErrorResponseSchema(501),
  ]);
