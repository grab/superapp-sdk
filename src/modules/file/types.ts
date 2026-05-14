/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse } from '../../core';

/**
 * Request parameters for downloading a file via native JSBridge.
 *
 * @example
 * ```typescript
 * {
 *   fileUrl: 'https://example.com/report.pdf',
 *   fileName: 'report.pdf'
 * }
 * ```
 *
 * @group Modules
 * @category File
 *
 * @public
 */
export interface DownloadFileRequest {
  /** HTTPS URL of the file to download. */
  fileUrl: string;
  /** Filename used when saving the download. */
  fileName: string;
}

/**
 * Result data structure for file download operations.
 *
 * @remarks
 * This is a void result type as successful downloads return status code 204 with no content.
 *
 * @group Modules
 * @category File
 *
 * @public
 */
export type DownloadFileResult = void;

/**
 * Response returned by {@link FileModule.downloadFile}.
 *
 * @group Modules
 * @category File
 *
 * @public
 */
export type DownloadFileResponse =
  | SDKNoContentResponse
  | SDKErrorResponse<400>
  | SDKErrorResponse<500>
  | SDKErrorResponse<501>;
