/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ProfileModule from './ProfileModule';

export default ProfileModule;

export type {
  // FetchEmail
  FetchEmailResponse,
  FetchEmailSuccessResponse,
  FetchEmailNoResultResponse,
  FetchEmailErrorResponse,
  EmailResult,

  // VerifyEmail
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailSuccessResponse,
  VerifyEmailCancelledResponse,
  VerifyEmailErrorResponse,
  VerifyEmailResult,
} from './types';
