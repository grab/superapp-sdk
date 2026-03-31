/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  FetchEmailResponseSchema,
  FetchEmailResultSchema,
  VerifyEmailRequestSchema,
  VerifyEmailResponseSchema,
} from './schemas';

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
export type FetchEmailResult = InferOutput<typeof FetchEmailResultSchema>;

/**
 * Response when fetching the user's email.
 *
 * @remarks
 * This response can have the following status codes:
 * - `200`: Email fetched successfully. The `result` contains the email address.
 * - `400`: Invalid request - the request was malformed.
 * - `403`: Forbidden - client not authorized to access user profile data.
 * - `426`: Upgrade Required - feature requires Grab app version 5.399 or above.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type FetchEmailResponse = InferOutput<typeof FetchEmailResponseSchema>;

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
export type VerifyEmailRequest = InferOutput<typeof VerifyEmailRequestSchema>;

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
 * - `403`: Forbidden - client not authorized to access user profile data.
 * - `426`: Upgrade Required - feature requires Grab app version 5.399 or above.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type VerifyEmailResponse = InferOutput<typeof VerifyEmailResponseSchema>;
