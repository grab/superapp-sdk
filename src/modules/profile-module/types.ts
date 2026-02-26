import type { SuccessResponse, NoResultResponse, ErrorResponse, Invoke } from '../../core';

/**
 * Parsed Grab user agent information
 */
export type GrabUserAgentInfo = {
  /**
   * App name (e.g., "Grab", "GrabBeta", "GrabBetaDebug", "GrabTaxi", "GrabEarlyAccess")
   */
  appName: string;
  /**
   * Major version number
   */
  major: number;
  /**
   * Minor version number
   */
  minor: number;
  /**
   * Patch version number
   */
  patch: number;
  /**
   * Platform (Android or iOS)
   */
  platform: string;
} | null;

/**
 * Version information for comparison
 */
export type VersionInfo = {
  major: number;
  minor: number;
  patch: number;
};

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
 * Method map for ProfileModule
 */
export type ProfileModuleMethods = {
  fetchEmail: { params: never; response: FetchEmailResponse };
  verifyEmail: { params: VerifyEmailRequest; response: VerifyEmailResponse };
};

declare global {
  interface Window {
    /**
     * Wrapped Profile Module interface for invoking native profile operations
     */
    WrappedProfileModule: {
      /**
       * Invokes a native profile module method
       * @param method - The method name to invoke
       * @param params - Optional parameters for the method
       * @returns Promise resolving to the native module response
       */
      invoke: Invoke<ProfileModuleMethods>;
    };
  }
}
