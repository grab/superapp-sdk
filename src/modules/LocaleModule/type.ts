/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

/**
 * Language locale identifier result (e.g., "en_US", "id_ID")
 */
export type LanguageLocaleResult = {
  /**
   * Language locale identifier string
   */
  locale: string;
};

/**
 * Response type for language locale identifier retrieval
 */
export type LanguageLocaleResponse = WrappedResponse<LanguageLocaleResult>;
