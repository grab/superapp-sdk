/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { ConstrainedBridgeResponse } from '../../core/response';

/**
 * Request parameters for downloading a file via native bridge.
 *
 * @example
 * ```typescript
 * {
 *   fileUrl: 'https://example.com/report.pdf',
 *   fileName: 'report.pdf'
 * }
 * ```
 *
 * @public
 */
export type DownloadFileRequest = {
  /** The URL of the file to download. */
  fileUrl: string;
  /** The desired name for the downloaded file. */
  fileName: string;
};

/**
 * Response when requesting a native file download.
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: File downloaded successfully.
 * - `400`: Invalid request parameters such as invalid file URL, invalid domain, or missing file name.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @example
 * **Success response (204):**
 * ```typescript
 * {
 *   status_code: 204
 * }
 * ```
 *
 * @example
 * **Bad request response (400):**
 * ```typescript
 * {
 *   status_code: 400,
 *   error: 'Invalid request'
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
 * @example
 * **Internal server error response (500):**
 * ```typescript
 * {
 *   status_code: 500,
 *   error: 'Internal server error'
 * }
 * ```
 *
 * @public
 */
export type DownloadFileResponse = ConstrainedBridgeResponse<void, 204 | 400 | 500 | 501>;
