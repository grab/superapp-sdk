/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, NoResultResponse, ErrorResponse } from '../../core';

/**
 * Email data result
 */
export type EmailResult = {
  /**
   * User's email address
   */
  email: string;
};

/**
 * Success response when email is fetched successfully
 */
export type FetchEmailSuccessResponse = SuccessResponse<EmailResult>;

/**
 * No result response when user does not have a verified email
 */
export type FetchEmailNoResultResponse = NoResultResponse & {
  /**
   * Status code: `204` - No verified email found for the user
   */
  status_code: 204;
};

/**
 * Error response when email fetch fails
 */
export type FetchEmailErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Client error (invalid request)
   * - `403`: Feature not supported (requires Grab app version 5.399 or above)
   * - `500`: Internal server error
   */
  status_code: 400 | 403 | 500;
};

/**
 * Response type for fetching email
 */
export type FetchEmailResponse =
  | FetchEmailSuccessResponse
  | FetchEmailNoResultResponse
  | FetchEmailErrorResponse;

/**
 * Request parameters for email verification
 */
export type VerifyEmailRequest = {
  /**
   * Email address to verify (optional)
   */
  email?: string;
  /**
   * Whether to skip user input and verify directly (optional)
   */
  skipUserInput?: boolean;
};

/**
 * Email verification result
 */
export type VerifyEmailResult = {
  /**
   * Verified email address
   */
  email: string;
};

/**
 * Success response when email is verified successfully
 */
export type VerifyEmailSuccessResponse = SuccessResponse<VerifyEmailResult>;

/**
 * No result response when user closes the verify OTP bottom sheet
 */
export type VerifyEmailCancelledResponse = NoResultResponse & {
  /**
   * Status code: `204` - User closed the native bottom sheet
   */
  status_code: 204;
};

/**
 * Error response when email verification fails
 */
export type VerifyEmailErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Client error (invalid email format)
   * - `403`: Unauthorized or feature not supported (requires Grab app version 5.399 or above)
   * - `500`: Internal server error
   */
  status_code: 400 | 403 | 500;
};

/**
 * Response type for email verification
 */
export type VerifyEmailResponse =
  | VerifyEmailSuccessResponse
  | VerifyEmailCancelledResponse
  | VerifyEmailErrorResponse;

/**
 * Concrete interface for the native Profile module bridge.
 */
export interface WrappedProfileModule {
  invoke(method: 'fetchEmail'): Promise<FetchEmailResponse>;
  invoke(method: 'verifyEmail', params: VerifyEmailRequest): Promise<VerifyEmailResponse>;
}

declare global {
  interface Window {
    WrappedProfileModule: WrappedProfileModule;
  }
}
