/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

/**
 * Sentinel error class for authorization configuration failures.
 *
 * @internal
 */
export class AuthorizationConfigurationError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'AuthorizationConfigurationError';
  }
}
