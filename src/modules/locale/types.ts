/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Result object containing the language locale identifier (for example, `"en"` or `"id"`).
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export type GetLanguageLocaleIdentifierResult = string;

/**
 * Response when getting the language locale identifier from the device.
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export type GetLanguageLocaleIdentifierResponse =
  | SDKOkResponse<GetLanguageLocaleIdentifierResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
