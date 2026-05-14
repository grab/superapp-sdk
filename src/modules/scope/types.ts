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
 * @example
 * ```typescript
 * {
 *   module: 'CameraModule',
 *   method: 'scanQRCode'
 * }
 * ```
 *
 * @group Modules
 * @category Scope
 *
 * @public
 */
export interface HasAccessToRequest {
  /** SDK module name (for example `CameraModule`). */
  module: string;
  /** Method name on that module (for example `scanQRCode`). */
  method: string;
}

/**
 * Boolean result indicating whether the MiniApp has access to the specified API.
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
 * @group Modules
 * @category Scope
 *
 * @public
 */
export type HasAccessToResult = boolean;

/**
 * Response returned by {@link ScopeModule.hasAccessTo}.
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
 * Response returned by {@link ScopeModule.reloadScopes}.
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
