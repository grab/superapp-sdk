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
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Email fetched successfully
   * - `400`: Invalid request
   * - `403`: Feature requires Grab app version 5.399 or above (returned client-side, not from JSBridge)
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ProfileModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ProfileModule, isResponseOk, isResponseError } = window.SuperAppSDK;
   *
   * // Initialize the profile module
   * const profileModule = new ProfileModule();
   *
   * // Fetch the user's email
   * try {
   *   const response = await profileModule.fetchEmail();
   *
   *   if (isResponseError(response)) {
   *     // Feature not available or other error
   *     console.log('Could not fetch email:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('User email:', response.result.email);
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
        result: undefined,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return this.wrappedModule.invoke('fetchEmail');
  }

  /**
   * Verifies the user's email address using a one-time password (OTP).
   *
   * @param request - The email verification configuration.
   *
   * @returns A promise that resolves to a response with one of the following possible status codes:
   * - `200`: Email verified successfully
   * - `400`: Invalid request
   * - `403`: Feature requires Grab app version 5.399 or above (returned client-side, not from JSBridge)
   *
   * @throws Error when the JSBridge method fails unexpectedly.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * // Imports using ES Module built
   * import { ProfileModule, isResponseOk, isResponseError } from '@grabjs/superapp-sdk';
   * // Imports using UMD built (via CDN)
   * const { ProfileModule, isResponseOk, isResponseError } = window.SuperAppSDK;
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
   *   if (isResponseError(response)) {
   *     // Feature not available or other error
   *     console.log('Could not verify email:', response.error);
   *   } else if (isResponseOk(response)) {
   *     console.log('Email verified successfully');
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
        result: undefined,
        error: 'This feature requires Grab app version 5.399 or above.',
      });
    }
    return this.wrappedModule.invoke('verifyEmail', request);
  }
}
