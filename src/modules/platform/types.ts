/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse } from '../../core';

/**
 * Result when triggering platform back navigation.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Platform
 *
 * @public
 */
export type BackResult = void;

/**
 * Response returned by {@link PlatformModule.back}.
 *
 * @group Modules
 * @category Platform
 *
 * @public
 */
export type BackResponse = SDKNoContentResponse | SDKErrorResponse<500> | SDKErrorResponse<501>;
