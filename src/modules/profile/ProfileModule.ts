/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { _BaseModule } from '../../core';
import { _Version, meetsMinimumVersion } from '../../utils/version';
import {
  FetchEmailResponseSchema,
  VerifyEmailRequestSchema,
  VerifyEmailResponseSchema,
} from './schemas';
import { FetchEmailResponse, VerifyEmailRequest, VerifyEmailResponse } from './types';

/**
 * JSBridge module for accessing user profile information.
 *
 * @group Modules
 * @category Profile
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
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk@x.y.z/dist/index.js"></script>
 * <script>
 *   const profile = new SuperAppSDK.ProfileModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class ProfileModule extends _BaseModule {
  constructor() {
    super('ProfileModule');
  }

  static readonly MINIMUM_VERSION: _Version = { major: 5, minor: 399, patch: 0 };

  /**
   * Fetches the user's email address from their Grab profile.
   *
   * @minimumGrabAppVersion Android: 5.399.0, iOS: 5.399.0
   *
   * @requiredOAuthScope mobile.profile
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - email fetched successfully. The `result` is {@link FetchEmailResult}.
   * - `204`: No content - email not available.
   * - `400`: Bad request - the request was malformed.
   * - `403`: Forbidden - client not authorized to access user profile data.
   * - `426`: Upgrade required - feature requires Grab app version 5.399 or above.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';
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
   * } else if (isError(response)) {
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
    const supportError = this.checkSupport((appInfo) =>
      meetsMinimumVersion(appInfo.version, ProfileModule.MINIMUM_VERSION)
    );
    if (supportError) return supportError;

    const response = (await this.invoke({ method: 'fetchEmail' })) as FetchEmailResponse;

    const responseError = this.validate(FetchEmailResponseSchema, response);
    if (responseError)
      this.logger.warn('fetchEmail', `Unexpected response shape: ${responseError}`);

    return response;
  }

  /**
   * Verifies the user's email address by triggering email capture bottom sheet and OTP verification.
   *
   * @minimumGrabAppVersion Android: 5.399.0, iOS: 5.399.0
   *
   * @requiredOAuthScope mobile.profile
   *
   * @param request - Optional email verification configuration.
   * Request fields:
   * - `email` (optional): Pre-filled email address shown in the native verification flow.
   * - `skipUserInput` (optional): If `true` with `email`, opens OTP verification directly.
   *
   * @returns A response with one of the following status codes:
   * - `200`: OK - email verified successfully. The `result` is {@link VerifyEmailResult}.
   * - `204`: No content - user closed the native bottom sheet.
   * - `400`: Bad request - client error (e.g. invalid email format).
   * - `403`: Forbidden - client not authorized to access user profile data.
   * - `426`: Upgrade required - feature requires Grab app version 5.399 or above.
   * - `500`: Internal server error - an unexpected error occurred on the native side.
   * - `501`: Not implemented - this method requires the Grab app environment.
   *
   * @remarks
   * If the user closes the verify OTP bottom sheet, the method will return a `status_code` of `204`.
   * Successful verification will also update the email address for the user on Grab.
   *
   * @example
   * **Usage**
   * ```typescript
   * import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the profile module
   * const profile = new ProfileModule();
   *
   * // Open the native email verification flow
   * const response = await profile.verifyEmail({
   *   email: 'user@example.com',
   *   skipUserInput: true,
   * });
   * // Call with no argument to let the user enter email in the native sheet:
   * // await profile.verifyEmail();
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   if (response.status_code === 200) {
   *     console.log('Verified email:', response.result.email);
   *   } else if (response.status_code === 204) {
   *     console.log('User closed the bottom sheet');
   *   }
   * } else if (isError(response)) {
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
  async verifyEmail(request?: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const supportError = this.checkSupport((appInfo) =>
      meetsMinimumVersion(appInfo.version, ProfileModule.MINIMUM_VERSION)
    );
    if (supportError) return supportError;

    const requestError = this.validate(VerifyEmailRequestSchema, request ?? {});
    if (requestError) return { status_code: 400, error: requestError };

    const response = (await this.invoke({
      method: 'verifyEmail',
      params: request,
    })) as VerifyEmailResponse;

    const responseError = this.validate(VerifyEmailResponseSchema, response);
    if (responseError)
      this.logger.warn('verifyEmail', `Unexpected response shape: ${responseError}`);

    return response;
  }
}
