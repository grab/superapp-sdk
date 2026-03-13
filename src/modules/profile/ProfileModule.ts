/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { detectGrabApp } from '../../utils/platform';
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
    const appInfo = detectGrabApp();
    if (!appInfo) {
      return false;
    }

    const minimumVersion: Version = { major: 5, minor: 399, patch: 0 };
    return meetsMinimumVersion(appInfo.version, minimumVersion);
  }

  /**
   * Fetches the user's email address from their Grab profile.
   *
   * @returns The user's email address if available.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the profile module
   * const profileModule = new ProfileModule();
   *
   * // Fetch the user's email
   * const response = await profileModule.fetchEmail();
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('User email:', response.result.email);
   *     break;
   *   case 400:
   *   case 403:
   *     // Feature not available or other error
   *     console.log('Could not fetch email:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async fetchEmail(): Promise<FetchEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return {
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      };
    }
    return (await this.invoke('fetchEmail')) as FetchEmailResponse;
  }

  /**
   * Verifies the user's email address using a one-time password (OTP).
   *
   * @param request - The email and OTP to verify.
   *
   * @returns Confirmation of whether the email verification was successful.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Initialize the profile module
   * const profileModule = new ProfileModule();
   *
   * // Verify email with OTP
   * const response = await profileModule.verifyEmail({
   *   email: 'user@example.com',
   *   otp: '123456'
   * });
   *
   * switch (response.status_code) {
   *   case 200:
   *     console.log('Email verified successfully');
   *     break;
   *   case 400:
   *   case 403:
   *     // Feature not available or other error
   *     console.log('Could not verify email:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return {
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      };
    }
    return (await this.invoke('verifyEmail', request)) as VerifyEmailResponse;
  }
}
