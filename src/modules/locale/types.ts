/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

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
 * - "zg" (Burmese Zawgyi)
 * - "my" (Burmese Unicode)
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
 * @public
 */
export type GetLanguageLocaleIdentifierResult = string;

/**
 * Response when getting the language locale identifier from the device.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Locale identifier retrieved successfully.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - English locale:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: 'en'
 * }
 * ```
 *
 * @example
 * **Success response (200) - Indonesian locale:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: 'id'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type GetLanguageLocaleIdentifierResponse = ConstrainedBridgeResponse<
  GetLanguageLocaleIdentifierResult,
  200 | 501
>;
