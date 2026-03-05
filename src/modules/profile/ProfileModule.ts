/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import {
  FetchEmailResponse,
  FetchEmailResult,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailResult,
} from './types';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { extractGrabAppInfoFromUserAgent } from '../../utils/user-agent';

/**
 * JSBridge module for accessing user profile information.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to user profile data such as email verification.
 * Requires the MiniApp to be running within the Grab SuperApp's webview.
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

  static isSupported() {
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
   * @returns Resolves with the user's email address on success, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Fetch the user's email
   * ```typescript
   * const response = await profileModule.fetchEmail();
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, result, error } = await profileModule.fetchEmail();
   *   switch (status_code) {
   *     case 200:
   *       console.log('User email:', result.email);
   *       break;
   *     case 403:
   *       console.log('Feature not available: Requires Grab app version 5.399 or above');
   *       break;
   *     default:
   *       console.log(`Could not fetch email${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (err) {
   *   console.log(`Could not fetch email${err ? `: ${err}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  fetchEmail(): Promise<FetchEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return this.wrappedModule.invoke<FetchEmailResult>('fetchEmail');
  }

  /**
   * Verifies the user's email address using a one-time password (OTP).
   *
   * @param request - The email address and OTP to verify.
   *
   * @returns Resolves when the email is verified successfully, or error information on failure.
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * Verify email with OTP
   * ```typescript
   * const response = await profileModule.verifyEmail({
   *   email: 'user@example.com',
   *   otp: '123456'
   * });
   * ```
   *
   * @example
   * Handling the response
   * ```typescript
   * try {
   *   const { status_code, error } = await profileModule.verifyEmail({
   *     email: 'user@example.com',
   *     otp: '123456'
   *   });
   *   switch (status_code) {
   *     case 204:
   *       console.log('Email verified successfully');
   *       break;
   *     case 403:
   *       console.log('Feature not available: Requires Grab app version 5.399 or above');
   *       break;
   *     default:
   *       console.log(`Could not verify email${error ? `: ${error}` : ''}`);
   *       break;
   *   }
   * } catch (err) {
   *   console.log(`Could not verify email${err ? `: ${err}` : ''}`);
   * }
   * ```
   *
   * @public
   */
  verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    if (!ProfileModule.isSupported()) {
      return Promise.resolve({
        status_code: 403,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return this.wrappedModule.invoke<VerifyEmailResult>('verifyEmail', request);
  }
}
