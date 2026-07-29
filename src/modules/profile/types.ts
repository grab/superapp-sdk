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
 * Result object containing the address selected from the native address picker.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export type ShowAddressPickerResult = {
  /** Short address label or street address (for example, `"1 Example Road"`). */
  address: string;
  /** Full formatted address (for example, `"1 Example Road, Singapore"`). */
  full_address: string;
  /** Unit or floor details for the address (for example, `"#01-0123"`). */
  unit_detail: string;
  /** Latitude coordinate of the selected address. */
  latitude: number;
  /** Longitude coordinate of the selected address. */
  longitude: number;
  /** ISO 3166-1 alpha-2 country code (for example, `"SG"`). */
  country_code: string;
  /** City for the selected address. */
  city: string;
  /** Postal code for the selected address. */
  postal_code: number;
};

/**
 * Response when showing the native address picker.
 *
 * @group Modules
 * @category Profile
 *
 * @public
 */
export type ShowAddressPickerResponse =
  | SDKOkResponse<ShowAddressPickerResult>
  | SDKNoContentResponse
  | SDKErrorResponse<403>
  | SDKErrorResponse<424>
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
