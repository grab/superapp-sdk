/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse } from '../../core';

/**
 * Response when dismissing the splash screen.
 *
 * @group Modules
 * @category Splash Screen
 *
 * @remarks
 * Possible status codes:
 * - `204`: No splash screen shown, or it was closed successfully.
 * - `400`: Invalid input (Grablet / client validation error).
 * - `403`: Missing consent for the required OAuth scope.
 * - `500`: Unexpected error while invoking `JSBridge`.
 * - `501`: Not in the Grab app WebView environment.
 *
 * @example
 * **Success (204):**
 * ```typescript
 * { status_code: 204 }
 * ```
 *
 * @example
 * **Bad request (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'InvalidInput: client input not valid'
 * }
 * ```
 *
 * @example
 * **Forbidden (403):**
 * ```typescript
 * {
 *   status_code: 403,
 *   error: 'NoAccess: client requesting for not consented scope'
 * }
 * ```
 *
 * @public
 */
export type DismissSplashScreenResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<403>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
