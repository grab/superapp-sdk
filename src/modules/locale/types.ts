/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse, Invoke } from '../../core';

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
 * Method map for LocaleModule
 */
export type LocaleModuleMethods = {
  getLanguageLocaleIdentifier: { params: never; response: GetLanguageLocaleIdentifierResponse };
};

declare global {
  interface Window {
    /**
     * Wrapped Locale Module interface for invoking native locale operations
     */
    WrappedLocaleModule: {
      /**
       * Invokes a native locale module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<LocaleModuleMethods>;
    };
  }
}
