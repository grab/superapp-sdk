/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Request parameters for checking if the current client has access to a specific API.
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
  /** The bridge module name to check access for. */
  module: string;
  /** The method name within the module to check access for. */
  method: string;
};

/**
 * Result object containing the access check result.
 *
 * @example
 * **Has access:**
 * ```typescript
 * { hasAccess: true }
 * ```
 *
 * @example
 * **No access:**
 * ```typescript
 * { hasAccess: false }
 * ```
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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Access check completed successfully. The `result` contains the access status.
 * - `400`: Missing required parameters - module or method not provided.
 * - `424`: ScopeKit error - unable to check access due to a dependency error.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200) - has access:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { hasAccess: true }
 * }
 * ```
 *
 * @example
 * **Success response (200) - no access:**
 * ```typescript
 * {
 *   status_code: 200,
 *   result: { hasAccess: false }
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Missing required parameters'
 * }
 * ```
 *
 * @example
 * **Failed dependency response (424):**
 * ```typescript
 * {
 *   status_code: 424,
 *   error: 'ScopeKit error'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type HasAccessToResponse = Promise<
  ConstrainedBridgeResponse<HasAccessToResult, 200 | 400 | 424 | 501>
>;

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
 * @remarks
 * This response can have the following status codes:
 * - `200`: Scopes reloaded successfully.
 * - `424`: ScopeKit error - unable to reload scopes due to a dependency error.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (200):**
 * ```typescript
 * { status_code: 200 }
 * ```
 *
 * @example
 * **Failed dependency response (424):**
 * ```typescript
 * {
 *   status_code: 424,
 *   error: 'ScopeKit error'
 * }
 * ```
 *
 * @example
 * **Not implemented response (501) - outside Grab app:**
 * ```typescript
 * {
 *   status_code: 501,
 *   error: 'Not implemented: This method requires the Grab app environment'
 * }
 * ```
 *
 * @public
 */
export type ReloadScopesResponse = Promise<
  ConstrainedBridgeResponse<ReloadScopesResult, 200 | 424 | 501>
>;
