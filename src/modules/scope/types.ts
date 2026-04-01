/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import {
  HasAccessToRequestSchema,
  HasAccessToResponseSchema,
  HasAccessToResultSchema,
  ReloadScopesResponseSchema,
} from './schemas';

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
export type HasAccessToRequest = InferOutput<typeof HasAccessToRequestSchema>;

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
export type HasAccessToResult = InferOutput<typeof HasAccessToResultSchema>;

/**
 * Response when checking API access permissions.
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
export type HasAccessToResponse = InferOutput<typeof HasAccessToResponseSchema>;

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
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type ReloadScopesResponse = InferOutput<typeof ReloadScopesResponseSchema>;
