/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse, SDKOkResponse } from '../../core';

/**
 * Request parameters for checking if the current client has access to a specific API.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export type HasAccessToRequest = {
  /** Method name to check scope access for (for example, `"scanQRCode"`). */
  method: string;
  /** Module name to check scope access for (for example, `"CameraModule"`). */
  module: string;
};

/**
 * Boolean result indicating whether the MiniApp has access to the specified API.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export type HasAccessToResult = boolean;

/**
 * Response when checking API access permissions.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export type HasAccessToResponse =
  | SDKOkResponse<HasAccessToResult>
  | SDKErrorResponse<400>
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;

/**
 * Response when reloading consented scopes.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export type ReloadScopesResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
