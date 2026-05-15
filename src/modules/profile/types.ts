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
 * @group Modules
 * @category Profile
 *
 * @public
 */
export type FetchEmailResult = {
  /** Email address used for profile verification (for example, `"john.doe@example.com"`). */
  email: string;
};

/**
 * Response when fetching the user's email.
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
 * @group Modules
 * @category Profile
 *
 * @remarks
 * Both properties are optional. If email is provided and `skipUserInput` is `true`,
 * the verify OTP bottom sheet will be triggered directly without user editing.
 *
 * @public
 */
export type VerifyEmailRequest = {
  /** Email address used for profile verification (for example, `"john.doe@example.com"`). */
  email?: string;
  /** Whether to skip email input and proceed directly to verification. */
  skipUserInput?: boolean;
};

/**
 * Result object for verifying the user's email.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export type VerifyEmailResult = {
  /** Email address used for profile verification (for example, `"john.doe@example.com"`). */
  email: string;
};

/**
 * Response when verifying the user's email.
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
