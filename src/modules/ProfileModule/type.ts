/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

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
 * Response type for fetching email
 */
export type FetchEmailResponse = WrappedResponse<EmailResult>;

/**
 * Request parameters for email verification
 */
export type VerifyEmailRequest = {
  /**
   * Email address to verify
   */
  email: string;
  /**
   * Verification code sent to the email
   */
  verificationCode: string;
};

/**
 * Email verification result
 */
export type VerifyEmailResult = {
  /**
   * Whether the email was successfully verified
   */
  verified: boolean;
};

/**
 * Response type for email verification
 */
export type VerifyEmailResponse = WrappedResponse<VerifyEmailResult>;
