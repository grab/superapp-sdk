/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Result containing the selected travel destination ISO 3166-1 alpha-2 country code (for example, `"sg"` or `"id"`).
 *
 * @group Modules
 * @category User Attributes
 *
 * @public
 */
export type GetSelectedTravelDestinationResult = string;

/**
 * Response when reading the selected travel destination.
 *
 * @group Modules
 * @category User Attributes
 *
 * @public
 */
export type GetSelectedTravelDestinationResponse =
  | SDKOkResponse<GetSelectedTravelDestinationResult>
  | SDKNoContentResponse
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
