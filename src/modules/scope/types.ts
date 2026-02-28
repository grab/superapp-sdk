/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuccessResponse, ErrorResponse, WrappedModule } from '../../core';

/**
 * Request parameters for checking access to a method
 */
export type HasAccessToRequest = {
  /**
   * Bridge module name
   */
  module: string;
  /**
   * Method name
   */
  method: string;
};

/**
 * Success response when access check is successful
 */
export type HasAccessToSuccessResponse = SuccessResponse<boolean>;

/**
 * Error response when access check fails
 */
export type HasAccessToErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid module or method name
   * - `500`: Internal error during access check
   */
  status_code: 400 | 500;
};

/**
 * Response type for hasAccessTo check
 */
export type HasAccessToResponse = HasAccessToSuccessResponse | HasAccessToErrorResponse;

/**
 * Success response when scopes are reloaded successfully
 */
export type ReloadScopesSuccessResponse = SuccessResponse<undefined>;

/**
 * Error response when scope reload fails
 */
export type ReloadScopesErrorResponse = ErrorResponse & {
  /**
   * Error status codes:
   * - `400`: Invalid request
   * - `500`: Internal error during scope reload
   */
  status_code: 400 | 500;
};

/**
 * Response type for reloadScopes
 */
export type ReloadScopesResponse = ReloadScopesSuccessResponse | ReloadScopesErrorResponse;

/**
 * Method map for ScopeModule
 */
export type ScopeModuleMethods = {
  hasAccessTo: { params: HasAccessToRequest; response: HasAccessToResponse };
  reloadScopes: { params: never; response: ReloadScopesResponse };
};

declare global {
  interface Window {
    WrappedScopeModule: WrappedModule<ScopeModuleMethods>;
  }
}
