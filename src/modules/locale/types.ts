/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response/types';

/**
 * Response when getting the language locale identifier from the device.
 *
 * @remarks
 * The locale identifier is the language and region code of the device's language settings.
 * Examples:
 * - "en" (English),
 * - "id" (Indonesia),
 * - "zh" (Chinese),
 * - "ms" (Malaysia),
 * - "th" (Thai),
 * - "vi" (Vietnamese),
 * - "zg" (Burmese Zawgyi),
 * - "my" (Burmese Unicode),
 * - "km" (Khmer)
 *
 * @public
 */
export type GetLanguageLocaleIdentifierResponse = ConstrainedBridgeResponse<string, 200>;
