/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Result containing the selected travel destination lowercase ISO 3166-1 alpha-2 country code.
 *
 * @example
 * ```typescript
 * 'id'
 * ```
 *
 * @example
 * ```typescript
 * 'sg'
 * ```
 *
 * @group Modules
 * @category User Attributes
 *
 * @public
 */
export type GetSelectedTravelDestinationResult = string;

/**
 * Response returned by {@link UserAttributesModule.getSelectedTravelDestination}.
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
