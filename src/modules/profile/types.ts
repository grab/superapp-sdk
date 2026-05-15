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
 * @example
 * ```typescript
 * { email: 'user@example.com' }
 * ```
 *
 * @public
 */
export type FetchEmailResult = {
  email: string;
};

/**
 * Response when fetching the user's email.
 *
 * @group Modules
 * @category Profile
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Email fetched successfully. The `result` contains the email address.
 * - `204`: No content - email not available.
 * - `400`: Invalid request - the request was malformed.
 * - `403`: Forbidden - client not authorized to access user profile data.
 * - `426`: Upgrade Required - feature requires Grab app version 5.399 or above.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * @public
 */
export type VerifyEmailRequest = {
  email?: string;
  skipUserInput?: boolean;
};

/**
 * Result object for verifying the user's email.
 *
 * @group Modules
 * @category Profile
 *
 * @example
 * ```typescript
 * { email: 'user@example.com' }
 * ```
 *
 * @public
 */
export type VerifyEmailResult = {
  email: string;
};

/**
 * Response when verifying the user's email.
 *
 * @group Modules
 * @category Profile
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Success, email verified and returned in `result`.
 * - `204`: User closed the native bottom sheet.
 * - `400`: Client error (e.g. invalid email format).
 * - `403`: Forbidden - client not authorized to access user profile data.
 * - `426`: Upgrade Required - feature requires Grab app version 5.399 or above.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Successful verification:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { email: 'user@example.com' }
 * }
 * ```
 *
 * @example
 * **User closed bottom sheet:**
 * ```typescript
 * { status_code: 204 }
 * ```
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
