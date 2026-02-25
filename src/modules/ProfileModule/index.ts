/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ModuleBase } from '../../core/ModuleBase';
import { FetchEmailResponse, VerifyEmailRequest, VerifyEmailResponse } from './type';
import { parseGrabUserAgent, isVersionBelow } from '../../utils/version';

/**
 * The ProfileModule provides functionality related to user profile information.
 *
 * **Required Scope:** `mobile.profile`
 *
 * **Version Requirements:** This module requires Grab app version 5.399 or above.
 *
 * @example
 * ```javascript
 * import { ProfileModule } from "@grabjs/superapp-sdk";
 *
 * // Ideally, initialize this only once and reuse across app.
 * const profileModule = new ProfileModule();
 * ```
 */
class ProfileModule extends ModuleBase {
  constructor() {
    super('ProfileModule');
  }
  /**
   * Check if the current Grab app version supports ProfileModule features
   * @returns True if supported (version 5.399 or above)
   * @internal
   */
  static isSupported(): boolean {
    const userAgentInfo = parseGrabUserAgent(window.navigator.userAgent);
    if (!userAgentInfo) {
      return false;
    }

    const minimumVersion = { major: 5, minor: 399, patch: 0 };
    return !isVersionBelow(userAgentInfo, minimumVersion);
  }

  /**
   * Fetch the user's verified email address.
   *
   * If the user does not have a verified email, the method will return a `status_code` of `204`.
   *
   * **Required Scope:** `mobile.profile`
   *
   * **Status Codes:**
   * - `200`: Success, verified email found and returned in `result`
   * - `204`: No verified email found for the user
   * - `400`: Client error (e.g. invalid request)
   * - `403`: Feature not supported (requires Grab app version 5.399 or above)
   * - `500`: Internal server error
   *
   * @returns Promise that resolves to email response
   *
   * @example
   * ```javascript
   * const { result, error, status_code } = await profileModule.fetchEmail();
   *
   * if (status_code === 200 && result) {
   *   console.log("User email:", result.email);
   * } else if (status_code === 204) {
   *   console.log("User does not have a verified email.");
   * } else if (error) {
   *   console.error("Fetch email error:", error);
   * }
   * ```
   */
  fetchEmail(): Promise<FetchEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return window.WrappedProfileModule.invoke('fetchEmail');
  }

  /**
   * Trigger email capture bottom sheet and OTP verification.
   *
   * If the user closes the verify OTP bottom sheet, the method will return a `status_code` of `204`.
   * Successful verification will also update the email address for the user on Grab.
   *
   * **Required Scope:** `mobile.profile`
   *
   * **Status Codes:**
   * - `200`: Success, email verified and returned in `result`
   * - `204`: User closed the native bottom sheet
   * - `400`: Client error (e.g. invalid email format)
   * - `403`: Unauthorised or feature not supported (requires Grab app version 5.399 or above)
   * - `500`: Internal server error
   *
   * @param verifyEmailDetails - Email verification details
   * @param verifyEmailDetails.email - Email address for verification. Native bottom sheet will be displayed with this email address if not empty (User can edit before proceeding) (optional)
   * @param verifyEmailDetails.skipUserInput - If set to `true`, and email is not empty, trigger the verify OTP bottom sheet directly (optional)
   * @returns Promise that resolves to verification response
   *
   * @example
   * ```javascript
   * const request = {
   *   email: "test@example.com",
   *   skipUserInput: false
   * };
   *
   * const { result, error, status_code } = await profileModule.verifyEmail(request);
   *
   * if (status_code === 200 && result) {
   *   console.log("Verified email:", result.email);
   * } else if (status_code === 204) {
   *   console.log("User closed the bottom sheet.");
   * } else if (error) {
   *   console.error("Verify email error:", error);
   * }
   * ```
   */
  verifyEmail(verifyEmailDetails: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return window.WrappedProfileModule.invoke('verifyEmail', verifyEmailDetails);
  }
}

export default ProfileModule;

export type {
  // FetchEmail
  FetchEmailResponse,

  // VerifyEmail
  VerifyEmailRequest,
  VerifyEmailResponse,
} from './type';
