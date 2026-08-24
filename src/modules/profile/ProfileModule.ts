/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { meetsMinimumVersion, Version } from '../../utils/version';
import {
  FetchEmailResponseSchema,
  VerifyEmailRequestSchema,
  VerifyEmailResponseSchema,
} from './schemas';
import { FetchEmailResponse, VerifyEmailRequest, VerifyEmailResponse } from './types';

/**
 * SDK module for accessing user profile information via `JSBridge`.
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
export class ProfileModule extends BaseModule {
  constructor() {
    super('ProfileModule');
  }

  static readonly MINIMUM_VERSION: Version = { major: 5, minor: 399, patch: 0 };

  /**
   * Fetches the user's email address from their Grab profile.
   *
   * @minimumGrabAppVersion Android: 5.399.0, iOS: 5.399.0
   *
   * @requiredOAuthScope mobile.profile
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Email fetched successfully. The `result` contains {@link FetchEmailResult}.
   * - `204` (No Content): Email not available.
   * - `400` (Bad Request): Invalid request parameters.
   * - `403` (Forbidden): Client is not authorized to access user profile data.
   * - `426` (Upgrade Required): Feature requires Grab app version 5.399 or above.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
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
   * @remarks
   * If the user closes the verify OTP bottom sheet, the verification flow ends early.
   * Successful verification will also update the email address for the user on Grab.
   *
   * @param request - Optional request parameters for email verification.
   *
   * @returns This method can return the following `status_code` values:
   * - `200` (OK): Success, email verified and returned in `result` as {@link VerifyEmailResult}.
   * - `204` (No Content): User closed the native bottom sheet.
   * - `400` (Bad Request): Invalid request parameters.
   * - `403` (Forbidden): Client is not authorized to access user profile data.
   * - `426` (Upgrade Required): Feature requires Grab app version 5.399 or above.
   * - `500` (Internal Server Error): An unexpected error occurred.
   * - `501` (Not Implemented): Requires Grab app environment.
   *
   * @example
   * **Simple usage with email provided**
   * ```typescript
   * import { ProfileModule, isSuccess, isError } from '@grabjs/superapp-sdk';
   *
   * // Initialize the profile module
   * const profile = new ProfileModule();
   *
   * // Verify email with pre-filled email address
   * const response = await profile.verifyEmail({
   *   email: 'user@example.com',
   *   skipUserInput: true
   * });
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
   * @example
   * **Usage without parameters**
   * ```typescript
   * import { ProfileModule } from '@grabjs/superapp-sdk';
   *
   * const profile = new ProfileModule();
   *
   * // Let user enter email in the native bottom sheet
   * const response = await profile.verifyEmail();
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
