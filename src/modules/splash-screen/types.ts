/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse } from '../../core';

/**
 * Response returned by {@link SplashScreenModule.dismiss}.
 *
 * @group Modules
 * @category Splash Screen
 *
 * @public
 */
export type DismissSplashScreenResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
