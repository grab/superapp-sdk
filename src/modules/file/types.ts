/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import type { SDKErrorResponse, SDKNoContentResponse } from '../../core';

/**
 * Request parameters for downloading a file through `JSBridge`.
 *
 * @group Modules
 * @category File
 *
 * @public
 */
export type DownloadFileRequest = {
  /** Target file name used for the downloaded file (for example, `"report.pdf"`). */
  fileName: string;
  /**
   * Source file URL to download (for example, `"https://example.com/report.pdf"`).
   * The MiniApp domain must be whitelisted by Grab before using `FileModule`.
   */
  fileUrl: string;
};

/**
 * Response when requesting a native file download.
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
