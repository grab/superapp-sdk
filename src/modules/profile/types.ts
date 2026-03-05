/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BridgeResponse } from '../../core/response';

/**
 * Result object containing the user's email address.
 *
 * @public
 */
export type FetchEmailResult = {
  /** The user's email address. */
  email: string;
};

/**
 * Response when fetching the user's email.
 *
 * @public
 */
export type FetchEmailResponse = BridgeResponse<FetchEmailResult>;

/**
 * Request parameters for verifying the user's email with an OTP.
 *
 * @public
 */
export type VerifyEmailRequest = {
  /** The email address to verify. */
  email: string;
  /** The one-time password (OTP) entered by the user. */
  otp: string;
};

/**
 * Result object for verifying the user's email.
 * This operation returns no data on success.
 *
 * @public
 */
export type VerifyEmailResult = void;

/**
 * Response when verifying the user's email.
 *
 * @public
 */
export type VerifyEmailResponse = BridgeResponse<VerifyEmailResult>;
