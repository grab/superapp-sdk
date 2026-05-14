/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Result object containing the user's email address.
 *
 * @example
 * ```typescript
 * { email: 'user@example.com' }
 * ```
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export interface FetchEmailResult {
  email: string;
}

/**
 * Response returned by {@link ProfileModule.fetchEmail}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export type FetchEmailResponse =
  | SDKOkResponse<FetchEmailResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Request parameters for verifying the user's email.
 *
 * @remarks
 * Both properties are optional. If email is provided and skipUserInput is true,
 * the verify OTP bottom sheet will be triggered directly without user editing.
 *
 * @example
 * ```typescript
 * {
 *   email: 'user@example.com',
 *   skipUserInput: true
 * }
 * ```
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export interface VerifyEmailRequest {
  /** Pre-filled email shown in the native verification UI. */
  email?: string;
  /**
   * When `true` together with `email`, opens OTP verification without letting the user edit the email first.
   *
   * @defaultValue `false` when omitted
   */
  skipUserInput?: boolean;
}

/**
 * Result object for verifying the user's email.
 *
 * @example
 * ```typescript
 * { email: 'user@example.com' }
 * ```
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export interface VerifyEmailResult {
  email: string;
}

/**
 * Response returned by {@link ProfileModule.verifyEmail}.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export type VerifyEmailResponse =
  | SDKOkResponse<VerifyEmailResult>
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<426>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
