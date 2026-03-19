/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { meetsMinimumVersion, Version } from '../../utils/version';
import { FetchEmailResponse, VerifyEmailRequest, VerifyEmailResponse } from './types';

/**
 * JSBridge module for accessing user profile information.
 *
 * @group Modules
 *
 * @remarks
 * Provides access to user profile data such as email verification.
 * This code must run on the Grab SuperApp's WebView to function correctly.
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
 * @noInheritDoc
 */
export class ProfileModule extends BaseModule {
  constructor() {
    super('ProfileModule');
  }

  static readonly MINIMUM_VERSION: Version = { major: 5, minor: 399, patch: 0 };

  /**
   * Fetches the user's email address from their Grab profile.
   *
   * @remarks
   * This method requires Grab app version 5.399 or above. If called on an older version,
   * it will return a 426 (Upgrade Required) response.
   *
   * @returns The user's email address if available.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ProfileModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the profile module
   * const profile = new ProfileModule();
   *
   * // Fetch the user's email
   * const response = await profile.fetchEmail();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('User email:', response.result.email);
   * } else if (isErrorResponse(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('No permission to access user profile');
   *       // Trigger IdentityModule.authorize() for scope 'profile email', then reload via ScopeModule.reloadScopes() and try again
   *       break;
   *     case 426:
   *       console.log('User needs to upgrade the app');
   *       // Advise user to upgrade app
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async fetchEmail(): Promise<FetchEmailResponse> {
    return (await this.invoke({
      method: 'fetchEmail',
      isSupported: (appInfo) => meetsMinimumVersion(appInfo.version, ProfileModule.MINIMUM_VERSION),
    })) as FetchEmailResponse;
  }

  /**
   * Verifies the user's email address using a one-time password (OTP).
   *
   * @remarks
   * This method requires Grab app version 5.399 or above. If called on an older version,
   * it will return a 426 (Upgrade Required) response.
   *
   * @param request - The email and OTP to verify.
   *
   * @returns Confirmation of whether the email verification was successful.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ProfileModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the profile module
   * const profile = new ProfileModule();
   *
   * // Verify email with OTP
   * const response = await profile.verifyEmail({
   *   email: 'user@example.com',
   *   otp: '123456'
   * });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('Email verified successfully');
   * } else if (isErrorResponse(response)) {
   *   switch (response.status_code) {
   *     case 403:
   *       console.log('No permission to access user profile');
   *       // Trigger IdentityModule.authorize() for scope 'profile email', then reload via ScopeModule.reloadScopes() and try again
   *       break;
   *     case 426:
   *       console.log('User needs to upgrade the app');
   *       // Advise user to upgrade app
   *       break;
   *     default:
   *       console.error(`Error ${response.status_code}: ${response.error}`);
   *   }
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return (await this.invoke({
      method: 'verifyEmail',
      params: request,
      isSupported: (appInfo) => meetsMinimumVersion(appInfo.version, ProfileModule.MINIMUM_VERSION),
    })) as VerifyEmailResponse;
  }
}
