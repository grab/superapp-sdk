/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  GetLanguageLocaleIdentifierResponseSchema,
  GetLanguageLocaleIdentifierResultSchema,
} from './schemas';

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
 * @public
 */
export type GetLanguageLocaleIdentifierResult = InferOutput<
  typeof GetLanguageLocaleIdentifierResultSchema
>;

/**
 * Response when getting the language locale identifier from the device.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Locale identifier retrieved successfully.
 * - `204`: No content - locale identifier not available.
 * - `400`: Invalid request parameters.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type GetLanguageLocaleIdentifierResponse = InferOutput<
  typeof GetLanguageLocaleIdentifierResponseSchema
>;
