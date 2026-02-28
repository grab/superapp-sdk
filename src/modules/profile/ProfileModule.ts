/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseModule } from '../../core';
import type { FetchEmailResponse, VerifyEmailRequest, VerifyEmailResponse } from './types';
import { meetsMinimumVersion } from '../../utils';
import { MINIMUM_PROFILE_VERSION } from './constants';

/**
 * Provides functionality related to user profile information.
 *
 * @remarks
 * **Required Scope:** `mobile.profile`
 *
 * **Version Requirements:** This module requires Grab app version 5.399 or above.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { ProfileModule } from '@grabjs/superapp-sdk';
 *
 * const profileModule = new ProfileModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const profileModule = new SuperAppSDK.ProfileModule();
 * </script>
 * ```
 */
class ProfileModule extends BaseModule {
  constructor() {
    super('ProfileModule');
  }
  /**
   * Check if the current Grab app version supports ProfileModule features
   *
   * @returns `true` if supported (version 5.399 or above), `false` otherwise.
   *
   * @internal
   */
  static isSupported(): boolean {
    return meetsMinimumVersion(window.navigator.userAgent, MINIMUM_PROFILE_VERSION);
  }

  /**
   * Fetch the user's verified email address.
   *
   * @remarks
   * **Required Scope:** `mobile.profile`
   *
   * **Version Requirements:** This method requires Grab app version 5.399 or above.
   *
   * If the user does not have a verified email, the method will return a `status_code` of `204`.
   *
   * @returns Promise that resolves to {@link FetchEmailResponse} with the user's email.
   *
   * @example
   * Basic usage:
   * ```typescript
   * try {
   *   const response = await profileModule.fetchEmail();
   *   if (response.status_code === 200) {
   *     console.log('User email:', response.result.email);
   *     document.getElementById('email').value = response.result.email;
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await profileModule.fetchEmail();
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('User email:', response.result.email);
   *       document.getElementById('email').value = response.result.email;
   *       break;
   *     case 204:
   *       console.log('User does not have a verified email.');
   *       showEmailCaptureForm();
   *       break;
   *     case 400:
   *       console.error('Invalid request:', response.error);
   *       break;
   *     case 403:
   *       console.error('Feature not supported:', response.error);
   *       break;
   *     case 500:
   *       console.error('Fetch email error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
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
   * @remarks
   * **Required Scope:** `mobile.profile`
   *
   * **Version Requirements:** This method requires Grab app version 5.399 or above.
   *
   * If the user closes the verify OTP bottom sheet, the method will return a `status_code` of `204`.
   * Successful verification will also update the email address for the user on Grab.
   *
   * @param verifyEmailDetails - Request parameters for email verification.
   *
   * @returns Promise that resolves to {@link VerifyEmailResponse} with the verified email.
   *
   * @example
   * Let user enter email:
   * ```typescript
   * try {
   *   const response = await profileModule.verifyEmail({});
   *   if (response.status_code === 200) {
   *     console.log('Verified email:', response.result.email);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Pre-fill email and let user edit:
   * ```typescript
   * try {
   *   const response = await profileModule.verifyEmail({
   *     email: 'test@example.com',
   *     skipUserInput: false
   *   });
   *   if (response.status_code === 200) {
   *     console.log('Verified email:', response.result.email);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Skip user input and verify directly:
   * ```typescript
   * try {
   *   const response = await profileModule.verifyEmail({
   *     email: 'test@example.com',
   *     skipUserInput: true
   *   });
   *   if (response.status_code === 200) {
   *     console.log('Verified email:', response.result.email);
   *   }
   * } catch (error) {
   *   console.error(error);
   * }
   * ```
   *
   * @example
   * Handling the response:
   * ```typescript
   * try {
   *   const response = await profileModule.verifyEmail({
   *     email: 'test@example.com',
   *     skipUserInput: true
   *   });
   *
   *   switch (response.status_code) {
   *     case 200:
   *       console.log('Email verified successfully:', response.result.email);
   *       saveEmailToDatabase(response.result.email);
   *       break;
   *     case 204:
   *       console.log('User closed the bottom sheet.');
   *       break;
   *     case 400:
   *       console.error('Invalid email format:', response.error);
   *       break;
   *     case 403:
   *       console.error('Feature not supported:', response.error);
   *       break;
   *     case 500:
   *       console.error('Verify email error:', response.error);
   *       break;
   *   }
   * } catch (error) {
   *   console.error(error);
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
