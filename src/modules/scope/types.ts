/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response/types';

/**
 * Request parameters for checking if the current client has access to a specific API.
 *
 * @public
 */
export type HasAccessToRequest = {
  /** The bridge module name to check access for. */
  module: string;
  /** The method name within the module to check access for. */
  method: string;
};

/**
 * Result object containing the access check result.
 *
 * @public
 */
export type HasAccessToResult = {
  /** True if the current client has access to the specified API, false otherwise. */
  hasAccess: boolean;
};

/**
 * Response when checking API access permissions.
 *
 * @public
 */
export type HasAccessToResponse = ConstrainedBridgeResponse<HasAccessToResult, 200 | 400 | 424>;

/**
 * Result object for reloading scopes.
 * This operation returns no data on success.
 *
 * @public
 */
export type ReloadScopesResult = void;

/**
 * Response when reloading consented scopes.
 *
 * @public
 */
export type ReloadScopesResponse = ConstrainedBridgeResponse<ReloadScopesResult, 200 | 424>;
