/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { extractGrabAppInfoFromUserAgent } from '../../utils/user-agent';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { FetchEmailResponse, VerifyEmailRequest, VerifyEmailResponse } from './types';

/**
 * JSBridge module for accessing user profile information.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to user profile data such as email verification.
 * This code must run on the Grab SuperApp's webview to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ProfileModule } from '@grabjs/superapp-sdk';
 * const profile = new ProfileModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const profile = new SuperAppSDK.ProfileModule();
 * </script>
 * ```
 *
 * @public
 */
export class ProfileModule extends BaseModule {
  constructor() {
    super('ProfileModule');
  }

  static isSupported(): boolean {
    const grapAppInfo = extractGrabAppInfoFromUserAgent();
    if (!grapAppInfo) {
      return false;
    }

    const minimumVersion: Version = { major: 5, minor: 399, patch: 0 };
    return meetsMinimumVersion(grapAppInfo.version, minimumVersion);
  }

  /**
   * Fetches the user's email address from their Grab profile.
   *
   * @returns The user's email address if available.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ProfileModule } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ProfileModule } = window.SuperAppSDK;
   *
   * // Initialize the profile module
   * const profileModule = new ProfileModule();
   *
   * // Fetch the user's email
   * try {
   *   const response = await profileModule.fetchEmail();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('User email:', response.result.email);
   *       break;
   *     case 400:
   *     case 403:
   *       // Feature not available or other error
   *       console.log('Could not fetch email:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (err) {
   *   console.log(`Could not fetch email${err ? `: ${err}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  fetchEmail(): FetchEmailResponse {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        result: undefined,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return this.invoke('fetchEmail');
  }

  /**
   * Verifies the user's email address using a one-time password (OTP).
   *
   * @param request - The email and OTP to verify.
   *
   * @returns Confirmation of whether the email verification was successful.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ProfileModule } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ProfileModule } = window.SuperAppSDK;
   *
   * // Initialize the profile module
   * const profileModule = new ProfileModule();
   *
   * // Verify email with OTP
   * try {
   *   const response = await profileModule.verifyEmail({
   *     email: 'user@example.com',
   *     otp: '123456'
   *   });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Email verified successfully');
   *       break;
   *     case 400:
   *     case 403:
   *       // Feature not available or other error
   *       console.log('Could not verify email:', response.error);
   *       break;
   *     case 501:
   *       console.log('Not in Grab app:', response.error);
   *       break;
   *     default:
   *       console.log('Unexpected status code:', response);
   *   }
   * } catch (err) {
   *   console.log(`Could not verify email${err ? `: ${err}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  verifyEmail(request: VerifyEmailRequest): VerifyEmailResponse {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        result: undefined,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return this.invoke('verifyEmail', request);
  }
}
