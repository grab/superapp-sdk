/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { InferOutput } from 'valibot';

import { DownloadFileRequestSchema, DownloadFileResponseSchema } from './schemas';

/**
 * Request parameters for downloading a file via native bridge.
 *
 * @group Modules
 * @category File
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
export type DownloadFileRequest = InferOutput<typeof DownloadFileRequestSchema>;

/**
 * Result data structure for file download operations.
 *
 * @group Modules
 * @category File
 *
 * @remarks
 * This is a void result type as successful downloads return status code 204 with no content.
 *
 * @public
 */
export type DownloadFileResult = void;

/**
 * Response when requesting a native file download.
 *
 * @group Modules
 * @category File
 *
 * @remarks
 * This response can have the following status codes:
 * - `204`: File downloaded successfully.
 * - `400`: Invalid request parameters such as invalid file URL, invalid domain, or missing file name.
 * - `500`: Internal server error - an unexpected error occurred on the native side.
 * - `501`: Not implemented - this method requires the Grab app environment.
 *
 * @public
 */
export type DownloadFileResponse = InferOutput<typeof DownloadFileResponseSchema>;
