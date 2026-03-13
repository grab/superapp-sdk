/*!
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */

import { BaseModule } from '../../core/module';
import { DownloadFileRequest, DownloadFileResponse } from './types';

/**
 * JSBridge module for downloading files to the user's device.
 *
 * @group Modules
 *
 * @remarks
 * Initiates native file download handling in the Grab app using a file URL and file name.
 * This code must run on the Grab SuperApp's webview to function correctly.
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
   * // Initialize the file module
   * const fileModule = new FileModule();
   *
   * // Download the file
   * const response = await fileModule.downloadFile({
   *   fileUrl: 'https://example.com/report.pdf',
   *   fileName: 'report.pdf',
   * });
   *
   * switch (response.status_code) {
   *   case 204:
   *     console.log('File downloaded successfully');
   *     break;
   *   case 400:
   *     console.log('Bad request:', response.error);
   *     break;
   *   case 500:
   *     console.log('Internal server error:', response.error);
   *     break;
   *   case 501:
   *     console.log('Not in Grab app:', response.error);
   *     break;
   *   default:
   *     console.log('Unexpected status code:', response);
   * }
   * ```
   *
   * @public
   */
  async downloadFile(request: DownloadFileRequest): Promise<DownloadFileResponse> {
    return (await this.invoke('downloadFile', request)) as DownloadFileResponse;
  }
}
