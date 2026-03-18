/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core';
import { DownloadFileRequest, DownloadFileResponse } from './types';

/**
 * JSBridge module for downloading files to the user's device.
 *
 * @group Modules
 *
 * @remarks
 * Initiates native file download handling in the Grab app using a file URL and file name.
 * This code must run on the Grab SuperApp's WebView to function correctly.
 *
 * @example
 * **ES Module:**
 * ```typescript
 * import { FileModule } from '@grabjs/superapp-sdk';
 * const fileModule = new FileModule();
 * ```
 *
 * @example
 * **CDN (UMD):**
 * ```html
 * <script src="https://cdn.jsdelivr.net/npm/@grabjs/superapp-sdk/dist/index.js"></script>
 * <script>
 *   const fileModule = new SuperAppSDK.FileModule();
 * </script>
 * ```
 *
 * @public
 * @noInheritDoc
 */
export class FileModule extends BaseModule {
  constructor() {
    super('FileModule');
  }

  /**
   * Downloads a file via the native bridge.
   *
   * @param request - File information, including URL and target file name.
   *
   * @returns Download operation result.
   *
   * @example
   * **Simple usage**
   * ```typescript
   * import { FileModule, isSuccess, isErrorResponse } from '@grabjs/superapp-sdk';
   *
   * // Initialize the file module
   * const file = new FileModule();
   *
   * // Download the file
   * const response = await file.downloadFile({
   *   fileUrl: 'https://example.com/report.pdf',
   *   fileName: 'report.pdf',
   * });
   *
   * // Handle the response
   * if (isSuccess(response)) {
   *   console.log('File downloaded successfully');
   * } else if (isErrorResponse(response)) {
   *   console.error(`Error ${response.status_code}: ${response.error}`);
   * } else {
   *   console.error('Unhandled response');
   * }
   * ```
   *
   * @public
   */
  async downloadFile(request: DownloadFileRequest): Promise<DownloadFileResponse> {
    return (await this.invoke({
      method: 'downloadFile',
      params: request,
    })) as DownloadFileResponse;
  }
}
