/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Result object containing the language locale identifier.
 *
 * @remarks
 * The locale identifier is the language code of the device's language settings.
 * Common values include:
 * - "en" (English)
 * - "id" (Indonesian)
 * - "zh" (Chinese)
 * - "ms" (Malay)
 * - "th" (Thai)
 * - "vi" (Vietnamese)
 * - "my" (Burmese)
 * - "ja" (Japanese)
 * - "ko" (Korean)
 * - "km" (Khmer)
 *
 * @example
 * ```typescript
 * 'en'
 * ```
 *
 * @example
 * ```typescript
 * 'id'
 * ```
 *
 * @group Modules
 * @category Locale
 *
 * @public
 */
export type GetLanguageLocaleIdentifierResult = string;

/**
 * Response returned by {@link LocaleModule.getLanguageLocaleIdentifier}.
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
