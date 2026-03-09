/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Result object containing the user's email address.
 *
 * @example
 * ```typescript
 * { email: 'user@example.com' }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Email fetched successfully. The `result` contains the email address.
 * - `400`: Invalid request - the request was malformed.
 * - `403`: Forbidden - feature requires Grab app version 5.399 or above.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { email: 'user@example.com' }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid request'
 * }
 * ```
 *
 * @example
 * **Forbidden response (403):**
 * ```typescript
 * {
 *   status_code: 403,
 *   error: 'This feature requires Grab app version 5.399 or above.'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type FetchEmailResponse = Promise<
  ConstrainedBridgeResponse<FetchEmailResult, 200 | 400 | 403 | 501>
>;

/**
 * Request parameters for verifying the user's email with an OTP.
 *
 * @example
 * ```typescript
 * {
 *   email: 'user@example.com',
 *   otp: '123456'
 * }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Email verified successfully.
 * - `400`: Invalid request - OTP is incorrect or expired.
 * - `403`: Forbidden - feature requires Grab app version 5.399 or above.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid OTP'
 * }
 * ```
 *
 * @example
 * **Forbidden response (403):**
 * ```typescript
 * {
 *   status_code: 403,
 *   error: 'This feature requires Grab app version 5.399 or above.'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type VerifyEmailResponse = Promise<
  ConstrainedBridgeResponse<VerifyEmailResult, 200 | 400 | 403 | 501>
>;
