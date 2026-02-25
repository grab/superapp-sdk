/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { WrappedResponse } from '../../core/types';

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
 * Response type for hasAccessTo check
 */
export type HasAccessToResponse = WrappedResponse<boolean>;

/**
 * Response type for reloadScopes
 */
export type ReloadScopesResponse = WrappedResponse<undefined>;
