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
 * @example
 * ```typescript
 * {
 *   module: 'CameraModule',
 *   method: 'scanQRCode'
 * }
 * ```
 *
 * @public
 */
export type HasAccessToRequest = {
  method: string;
  module: string;
};

/**
 * Boolean result indicating whether the MiniApp has access to the specified API.
 *
 * @group Modules
 * @category Scope
 *
 * @example
 * **Has access:**
 * ```typescript
 * true
 * ```
 *
 * @example
 * **No access:**
 * ```typescript
 * false
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Access check completed successfully. The `result` contains the access status.
 * - `400`: Missing required parameters - module or method not provided.
 * - `424`: ScopeKit error - unable to check access due to a dependency error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
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
 * Result object for reloading scopes.
 * This operation returns no data on success.
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export type ReloadScopesResult = void;

/**
 * Response when reloading consented scopes.
 *
 * @group Modules
 * @category Scope
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: Scopes reloaded successfully (no content).
 * - `424`: ScopeKit error - unable to reload scopes due to a dependency error.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type ReloadScopesResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<424>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
