/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse } from '../../core';

/**
 * Language locale identifier result (e.g., "en_US", "id_ID")
 */
export type GetLanguageLocaleIdentifierResult = {
  /**
   * Language locale identifier string
   */
  locale: string;
};

/**
 * Success response when language locale identifier is retrieved successfully
 */
export type GetLanguageLocaleIdentifierSuccessResponse =
  SuccessResponse<GetLanguageLocaleIdentifierResult>;

/**
 * Error response when language locale identifier retrieval fails
 */
export type GetLanguageLocaleIdentifierErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request
   * - `500`: Internal error retrieving locale
   */
  status_code: 400 | 500;
};

/**
 * Response type for language locale identifier retrieval
 */
export type GetLanguageLocaleIdentifierResponse =
  | GetLanguageLocaleIdentifierSuccessResponse
  | GetLanguageLocaleIdentifierErrorResponse;

/**
 * Concrete interface for the native Locale module bridge.
 */
export interface WrappedLocaleModule {
  invoke(method: 'getLanguageLocaleIdentifier'): Promise<GetLanguageLocaleIdentifierResponse>;
}

declare global {
  interface Window {
    WrappedLocaleModule: WrappedLocaleModule;
  }
}
